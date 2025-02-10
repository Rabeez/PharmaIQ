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
export interface DrugDetails {
  CODE: string;
  NAME: string;
  INFO: DrugInfo;
}

function nestDrugDetails(row: any): DrugDetails {
  const { CODE, NAME, ...rest } = row;
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
  };
}

export async function fetchDrugDetails(
  drugName: string,
): Promise<DrugDetails | null> {
  const query = "SELECT * FROM drug WHERE name = ?";
  const flatResults = await executeQuery<any>(query, [drugName]);

  if (!flatResults || flatResults.length === 0) {
    console.log(`No results found for drug=${drugName}.`);
    return null;
  }

  const drug = nestDrugDetails(flatResults[0]);

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
