import initSqlJs, { Database } from "sql.js";

export async function initializeDatabase(): Promise<Database> {
  const SQL = await initSqlJs({
    locateFile: (file) => `https://sql.js.org/dist/${file}`,
  });
  const response = await fetch("/data.db");
  if (!response.ok) throw new Error("Failed to load database file");
  const buffer = await response.arrayBuffer();
  return new SQL.Database(new Uint8Array(buffer));
}

export async function executeQuery<T>(
  query: string,
  params: any[] = [],
): Promise<T[]> {
  const db = await initializeDatabase();
  const stmt = db.prepare(query);
  stmt.bind(params);
  const results: T[] = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject() as T);
  }
  stmt.free();
  return results;
}
