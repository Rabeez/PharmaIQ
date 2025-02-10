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
  BRANDS: any;
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
    BRANDS: null,
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

  const drug = nestDrugDetails(flatResults_info[0], {
    ADULT: flatResults_d_adult[0],
    PAEDIATRIC: flatResults_d_paed[0],
    NEONATAL: flatResults_d_neonat[0],
  });

  return drug;
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
