import { useEffect, useState } from "react";
import { Platform } from "react-native";
import initSqlJs, { Database } from "sql.js";

type DBInstance = Database | any | null; // Use `any` for `expo-sqlite` since it loads dynamically

let SQLite: any;
if (Platform.OS !== "web") {
  SQLite = require("expo-sqlite");
}

async function loadData(setData: (data: any[]) => void) {
  const q = "SELECT NAME FROM DRUG";
  let db: DBInstance = null;

  if (Platform.OS === "web") {
    console.log("WEB");
    const SQL = await initSqlJs({
      locateFile: (file) => `https://sql.js.org/dist/sql-wasm.wasm`,
    });
    // Fetch the database file from the public directory
    const response = await fetch("/data.db");
    if (!response.ok) throw new Error("Failed to load database file");

    // Convert response to ArrayBuffer and create Uint8Array
    const buffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);

    // Create and return the SQL.js Database instance
    db = new SQL.Database(uint8Array);

    // Web: Run a query
    const stmt = db.prepare(q);
    const results: string[] = [];
    while (stmt.step()) {
      results.push(stmt.getAsObject().NAME as string);
    }
    stmt.free();
    setData(results);
  } else {
    console.log("NATIVE");
    db = await SQLite.openDatabaseAsync("data.db");

    // Native: Run a query
    const allRows = (await db.getAllAsync(q)) as { NAME: string }[];
    const brandNames: string[] = allRows.map((row) => row.NAME);
    setData(brandNames);
  }
}

export default function useDatabase(): string[] {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    loadData(setData);
  }, []);

  return data;
}
