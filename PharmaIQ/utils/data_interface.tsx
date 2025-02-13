import React, { useEffect, useState, createContext, useContext } from "react";
import { executeQuery } from "./db"; // Metro picks db.native.ts on native, db.web.ts on web
import { SearchRecord } from "./search";

export interface Entry {
  code: number;
  name: string;
}

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
  BRANDS: Entry[];
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
  brands: Entry[],
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

  let brands: Entry[] = [];
  query = "SELECT BID FROM brand_drug WHERE DID = ?";
  let flatResults_rb = await executeQuery<any>(query, [drug_code]);
  if (!flatResults_rb || flatResults_rb.length === 0) {
    console.log(`No brand IDs found for drug=${drug_code}.`);
  }
  let codes = flatResults_rb.map((row) => row.BID);
  codes = Array.from(new Set(codes));
  const placeholders = codes.map(() => "?").join(",");
  query = `SELECT DISTINCT bid, bname FROM brand WHERE bid IN (${placeholders}) ORDER BY bname;`;
  const flatResults_brands = await executeQuery<any>(query, codes);
  if (!flatResults_brands || flatResults_brands.length === 0) {
    console.log(`No brand names found for brands=${codes}.`);
  } else {
    brands = flatResults_brands.map((row) => ({
      code: row.BID,
      name: row.BNAME,
    }));
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

export interface BrandForm {
  packing: string;
  weight: string;
}
export interface BrandDetails {
  CODE: string;
  NAME: string;
  COMP_NAME: string;
  FORMS: Record<string, BrandForm[]>;
  COMPOSITION: Entry[];
  BRANDS: Entry[];
}
function nestBrandDetails(
  code: any,
  name: string,
  company_name: string,
  forms: Record<string, BrandForm[]>,
  comps: Entry[],
  brands: Entry[],
): BrandDetails {
  return {
    CODE: code,
    NAME: name,
    COMP_NAME: company_name,
    FORMS: forms,
    COMPOSITION: comps,
    BRANDS: brands,
  };
}

export async function fetchBrandDetails(
  brandName: string,
): Promise<BrandDetails | null> {
  let query = "SELECT BID, CID FROM BRAND WHERE BNAME = ?";
  let flatResults = await executeQuery<any>(query, [brandName]);
  if (!flatResults || flatResults.length === 0) {
    console.log(`No brand data found for brand=${brandName}.`);
    return null;
  }

  const brand_code = flatResults[0].BID;
  const company_code = flatResults[0].CID;

  let company_name = "";
  query = "SELECT NAME FROM COMPANY WHERE ID = ?";
  const flatResults_company = await executeQuery<any>(query, [company_code]);
  if (!flatResults_company || flatResults_company.length === 0) {
    console.log(
      `No company data found for brand=${brandName}, company_code=${company_code}.`,
    );
  }
  company_name = flatResults_company[0].NAME;

  query = "SELECT * FROM BRAND_DRUG WHERE BID = ?";
  const flatResults_bd = await executeQuery<any>(query, [brand_code]);
  if (!flatResults_bd || flatResults_bd.length === 0) {
    console.log(
      `No brand data found for brand=${brandName}, code=${brand_code}.`,
    );
    return null;
  }
  const brand_name = flatResults_bd[0].NAME;

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
  let placeholders = codes.map(() => "?").join(",");
  query = `SELECT DISTINCT code, name FROM drug WHERE code IN (${placeholders}) ORDER BY name;`;
  let flatResults_comps = await executeQuery<any>(query, codes);
  if (!flatResults_comps || flatResults_comps.length === 0) {
    console.log(
      `No component data found for brand=${brandName}, drug_codes=${codes}.`,
    );
    flatResults_comps = [];
  }
  const comps: Entry[] = flatResults_comps.map((row) => ({
    code: row.code,
    name: row.NAME,
  }));

  let brands: Entry[] = [];
  query = `
  WITH brand_lists AS (
    SELECT BID, GROUP_CONCAT(DID, ',') AS drug_list
    FROM (
      SELECT DISTINCT BID, DID
      FROM brand_drug
      ORDER BY BID, DID
    )
    GROUP BY BID
  ),
  given_brand_list AS (
    SELECT drug_list
    FROM brand_lists
    WHERE BID = ?
  )
  SELECT BID
  FROM brand_lists
  WHERE BID <> ? AND drug_list = (SELECT drug_list FROM given_brand_list);
`;

  const flatResults_rb = await executeQuery<any>(query, [
    brand_code,
    brand_code,
  ]);
  if (!flatResults_rb || flatResults_rb.length === 0) {
    console.log(`No alternate brands found for brand=${brand_name}.`);
  } else {
    codes = flatResults_rb.map((row) => row.BID);
    codes = Array.from(new Set(codes));
    placeholders = codes.map(() => "?").join(",");
    query = `SELECT DISTINCT bid, bname FROM brand WHERE bid IN (${placeholders}) ORDER BY bname;`;
    const flatResults_brands = await executeQuery<any>(query, codes);
    if (!flatResults_brands || flatResults_brands.length === 0) {
      console.log(`No brand names found for alternate brands=${codes}.`);
    } else {
      brands = flatResults_brands.map((row) => ({
        code: row.bid,
        name: row.BNAME,
      }));
    }
  }

  const brand = nestBrandDetails(
    brand_code,
    brand_name,
    company_name,
    forms,
    comps,
    brands,
  );
  console.log("BRAND", brand);

  return brand;
}

async function loadSearchData(setData: (data: SearchRecord[]) => void) {
  let query_drug = "SELECT CODE, NAME FROM DRUG";
  let query_brand = "SELECT BID, BNAME FROM BRAND";
  try {
    const results_drug = await executeQuery<{ CODE: number; NAME: string }>(
      query_drug,
    );
    const results_brand = await executeQuery<{ BID: number; BNAME: string }>(
      query_brand,
    );

    const results = [
      ...results_drug.map((row) => {
        return {
          type: "drug",
          data: {
            code: row.CODE,
            name: row.NAME,
          },
        } as SearchRecord;
      }),
      ...results_brand.map((row) => {
        return {
          type: "brand",
          data: {
            code: row.BID,
            name: row.BNAME,
          },
        } as SearchRecord;
      }),
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
