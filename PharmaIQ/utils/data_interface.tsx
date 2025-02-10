import React, { useEffect, useState, createContext, useContext } from "react";
import { executeQuery } from "./db"; // Metro picks db.native.ts on native, db.web.ts on web

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
    ADULT: DrugDosage;
    PAEDIATRIC: DrugDosage;
    NEONATAL: DrugDosage;
  };
  BRANDS: any;
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
      ADULT: dosage.ADULT,
      PAEDIATRIC: dosage.PAEDIATRIC,
      NEONATAL: dosage.NEONATAL,
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
  const flatResults_d_adult = await executeQuery<any>(query, [drug_code]);
  if (!flatResults_d_adult || flatResults_d_adult.length === 0) {
    console.log(`No dosage-adult results found for drug=${drugName}.`);
    return null;
  }
  query = "SELECT * FROM adult WHERE code = ?";
  const flatResults_d_paed = await executeQuery<any>(query, [drug_code]);
  if (!flatResults_d_paed || flatResults_d_paed.length === 0) {
    console.log(`No dosage-paed results found for drug=${drugName}.`);
    return null;
  }
  query = "SELECT * FROM adult WHERE code = ?";
  const flatResults_d_neonat = await executeQuery<any>(query, [drug_code]);
  if (!flatResults_d_neonat || flatResults_d_neonat.length === 0) {
    console.log(`No dosage-neonat results found for drug=${drugName}.`);
    return null;
  }

  const drug = nestDrugDetails(flatResults_info[0], {
    ADULT: flatResults_d_adult[0],
    PAEDIATRIC: flatResults_d_paed[0],
    NEONATAL: flatResults_d_neonat[0],
  });

  return drug;
}

async function loadSearchData(setData: (data: string[]) => void) {
  const query = "SELECT NAME FROM DRUG";
  try {
    const results = await executeQuery<{ NAME: string }>(query);
    setData(results.map((row) => row.NAME));
  } catch (error) {
    console.error("Failed to load drug names:", error);
    setData([]); // Fallback to empty array in case of failure
  }
}

export default function useDatabase(): string[] {
  // TODO: useQuery spot
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    loadSearchData(setData);
  }, []);

  return data;
}

// TODO: this is specifically for initial data (source for search)
// need to make this better AND/OR use same TS interface for this and actual search/fetch function
interface DBContextType {
  data: string[];
}

const DBContext = createContext<DBContextType>({ data: [] });

export const DBProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const data = useDatabase();
  return <DBContext.Provider value={{ data }}>{children}</DBContext.Provider>;
};

export const useDB = () => useContext(DBContext);
