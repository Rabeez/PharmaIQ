import React, { useEffect, useState, createContext, useContext } from "react";
import { executeQuery } from "./db"; // Metro picks db.native.ts on native, db.web.ts on web
import { SearchRecord } from "./search";

// Define your DrugDetails interface as needed
export interface DrugInfo {
  OVERVIEW: string;
  CHARACTERSTICS: string;
  INDICATIONS: string;
  CONTRAINDICATIONS: string;
  INTERACTIONS: string;
  INTERFERENCE: string;
  EFFECTS: string;
  RISK: string;
  WARNINING: string;
  STORAGE: string;
}
export interface DrugDosage {
  DOSE: string;
  SINGLE: string;
  FREQ: string;
  ROUTE: string;
  INSTRUCTION: string;
}
export interface DrugDetails {
  CODE: string;
  NAME: string;
  INFO: DrugInfo;
  DOSAGE: {
    ADULT: DrugDosage | null;
    PAEDIATRIC: DrugDosage | null;
    NEONATAL: DrugDosage | null;
  };
  BRANDS: string[];
}

function nestDrugDosage(dosage: any): DrugDosage | null {
  if (!dosage) return null;
  return {
    DOSE: dosage.DOSE ?? "",
    SINGLE: dosage.SINGLE ?? "",
    FREQ: dosage.FREQ ?? "",
    ROUTE: dosage.ROUTE ?? "",
    INSTRUCTION: dosage.INSTRUCTION ?? "",
  };
}

function nestDrugDetails(
  info: any,
  dosage: { ADULT: any; PAEDIATRIC: any; NEONATAL: any },
  brands: string[],
): DrugDetails {
  const { CODE, NAME, ...rest } = info;
  return {
    CODE,
    NAME,
    INFO: {
      OVERVIEW: rest.OVERVIEW,
      CHARACTERSTICS: rest.CHARACTERSTICS,
      INDICATIONS: rest.INDICATIONS,
      CONTRAINDICATIONS: rest.CONTRAINDICATIONS,
      INTERACTIONS: rest.INTERACTIONS,
      INTERFERENCE: rest.INTERFERENCE,
      EFFECTS: rest.EFFECTS,
      RISK: rest.RISK,
      WARNINING: rest.WARNINING,
      STORAGE: rest.STORAGE,
    },
    DOSAGE: {
      ADULT: nestDrugDosage(dosage.ADULT),
      PAEDIATRIC: nestDrugDosage(dosage.PAEDIATRIC),
      NEONATAL: nestDrugDosage(dosage.NEONATAL),
    },
    BRANDS: brands,
  };
}

export async function fetchDrugDetails(
  drugName: string,
): Promise<DrugDetails | null> {
  let query = "SELECT * FROM drug WHERE name = ?";
  let flatResults_info = await executeQuery<any>(query, [drugName]);
  if (!flatResults_info || flatResults_info.length === 0) {
    console.log(`No info results found for drug=${drugName}.`);
    return null;
  }

  const drug_code = flatResults_info[0].CODE;

  query = "SELECT * FROM adult WHERE code = ?";
  let flatResults_d_adult = await executeQuery<any>(query, [drug_code]);
  if (!flatResults_d_adult || flatResults_d_adult.length === 0) {
    console.log(`No dosage-adult results found for drug=${drugName}.`);
    flatResults_d_adult = [null];
  }
  query = "SELECT * FROM paedriatic WHERE code = ?";
  let flatResults_d_paed = await executeQuery<any>(query, [drug_code]);
  if (!flatResults_d_paed || flatResults_d_paed.length === 0) {
    console.log(`No dosage-paed results found for drug=${drugName}.`);
    flatResults_d_paed = [null];
  }
  query = "SELECT * FROM neonatal WHERE code = ?";
  let flatResults_d_neonat = await executeQuery<any>(query, [drug_code]);
  if (!flatResults_d_neonat || flatResults_d_neonat.length === 0) {
    console.log(`No dosage-neonat results found for drug=${drugName}.`);
    flatResults_d_neonat = [null];
  }

  let brands: string[] = [];
  query = "SELECT BID FROM brand_drug WHERE DID = ?";
  let flatResults_rb = await executeQuery<any>(query, [drug_code]);
  if (!flatResults_rb || flatResults_rb.length === 0) {
    console.log(`No brand IDs found for drug=${drug_code}.`);
  }
  let codes = flatResults_rb.map((row) => row.BID);
  codes = Array.from(new Set(codes));
  const placeholders = codes.map(() => "?").join(",");
  query = `SELECT DISTINCT bname FROM brand WHERE bid IN (${placeholders});`;
  const flatResults_brands = await executeQuery<any>(query, codes);
  if (!flatResults_brands || flatResults_brands.length === 0) {
    console.log(`No brand names found for brands=${codes}.`);
  } else {
    brands = flatResults_brands.map((row) => row.BNAME);
  }

  const drug = nestDrugDetails(
    flatResults_info[0],
    {
      ADULT: flatResults_d_adult[0],
      PAEDIATRIC: flatResults_d_paed[0],
      NEONATAL: flatResults_d_neonat[0],
    },
    brands,
  );

  return drug;
}

// TODO: make this dynamic so form is key and other stuff obj is value
// will be better for accordion
export interface BrandForm {
  packing: string;
  weight: string;
}
export interface BrandDetails {
  CODE: string;
  NAME: string;
  FORMS: Record<string, BrandForm[]>;
  COMPOSITION: string[];
  BRANDS: string[];
}
function nestBrandDetails(
  code: any,
  name: string,
  forms: Record<string, BrandForm[]>,
  comps: string[],
  brands: string[],
): BrandDetails {
  return {
    CODE: code,
    NAME: name,
    FORMS: forms,
    COMPOSITION: comps,
    BRANDS: brands,
  };
}

export async function fetchBrandDetails(
  brandName: string,
): Promise<BrandDetails | null> {
  let query = "SELECT BID FROM BRAND WHERE BNAME = ?";
  let flatResults = await executeQuery<any>(query, [brandName]);
  if (!flatResults || flatResults.length === 0) {
    console.log(`No brand data found for brand=${brandName}.`);
    return null;
  }

  const brand_code = flatResults[0].BID;

  query = "SELECT * FROM BRAND_DRUG WHERE BID = ?";
  const flatResults_bd = await executeQuery<any>(query, [brand_code]);
  if (!flatResults_bd || flatResults_bd.length === 0) {
    console.log(
      `No brand data found for brand=${brandName}, code=${brand_code}.`,
    );
    return null;
  }

  const forms: Record<string, BrandForm[]> = {};
  flatResults_bd.forEach((item) => {
    if (!forms[item.FORM]) {
      forms[item.FORM] = [{ packing: item.PACKING, weight: item.MG }];
    } else {
      forms[item.FORM].push({ packing: item.PACKING, weight: item.MG });
    }
  });

  let codes = flatResults_bd.map((obj) => obj.DID);
  codes = Array.from(new Set(codes));
  const placeholders = codes.map(() => "?").join(",");
  query = `SELECT DISTINCT name FROM drug WHERE code IN (${placeholders});`;
  let flatResults_comps = await executeQuery<any>(query, codes);
  if (!flatResults_comps || flatResults_comps.length === 0) {
    console.log(
      `No component data found for brand=${brandName}, drug_codes=${codes}.`,
    );
    flatResults_comps = [];
  }
  const comps = flatResults_comps.map((row) => row.NAME);

  const brands = ["asd"];

  const brand = nestBrandDetails(
    brand_code,
    flatResults_bd[0].NAME,
    forms,
    comps,
    brands,
  );
  console.log("BRAND", brand);

  return brand;
}

async function loadSearchData(setData: (data: SearchRecord[]) => void) {
  let query_drug = "SELECT NAME FROM DRUG";
  let query_brand = "SELECT BNAME FROM BRAND";
  try {
    const results_drug = await executeQuery<{ NAME: string }>(query_drug);
    const results_brand = await executeQuery<{ BNAME: string }>(query_brand);

    const results = [
      ...results_drug.map(
        (row) => ({ type: "drug", name: row.NAME }) as SearchRecord,
      ),
      ...results_brand.map(
        (row) => ({ type: "brand", name: row.BNAME }) as SearchRecord,
      ),
    ];

    setData(results);
  } catch (error) {
    console.error("Failed to load drug names:", error);
    setData([]); // Fallback to empty array in case of failure
  }
}

export default function useDatabase(): SearchRecord[] {
  // TODO: useQuery spot
  const [data, setData] = useState<SearchRecord[]>([]);

  useEffect(() => {
    loadSearchData(setData);
  }, []);

  return data;
}

// TODO: this is specifically for initial data (source for search)
// need to make this better AND/OR use same TS interface for this and actual search/fetch function
interface DBContextType {
  data: SearchRecord[];
}

const DBContext = createContext<DBContextType>({ data: [] });

export const DBProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const data = useDatabase();
  return <DBContext.Provider value={{ data }}>{children}</DBContext.Provider>;
};

export const useDB = () => useContext(DBContext);
