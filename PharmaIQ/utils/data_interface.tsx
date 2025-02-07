import React, { useEffect, useState, createContext, useContext } from "react";
import { executeQuery } from "./db"; // Metro picks db.native.ts on native, db.web.ts on web

// Define your DrugDetails interface as needed
export interface DrugDetails {
  name: string;
  overview: string;
  characteristics: string;
}

export async function fetchDrugDetails(
  drugName: string,
): Promise<DrugDetails | null> {
  const query =
    "SELECT name, overview, characterstics FROM drug WHERE name = ?";
  const results = await executeQuery<DrugDetails>(query, [drugName]);
  console.log("Raw query results:", results);

  if (!results || results.length === 0) {
    console.log("No results found.");
    return null;
  }

  const drug = results[0];
  console.log("Parsed drug details:", drug);

  return {
    name: drug.name ?? "Unknown",
    overview: drug.overview ?? "No Overview",
    characteristics: drug.characteristics ?? "No Characteristics",
  };
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
