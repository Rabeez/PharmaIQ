import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

const DB_DIR = FileSystem.documentDirectory + "SQLite/"; // default location for expo-sqlite

async function prepareDatabase(name: string): Promise<void> {
  // Ensure the SQLite directory exists
  const dirInfo = await FileSystem.getInfoAsync(DB_DIR);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(DB_DIR, { intermediates: true });
  }

  // Load the asset – adjust the path if necessary
  const asset = Asset.fromModule(require("../assets/data.db"));
  await asset.downloadAsync();

  console.log("Asset localUri:", asset.localUri);
  console.log("Asset uri:", asset.uri);

  // Use localUri if available; otherwise, fall back to asset.uri
  const sourceUri = asset.localUri || asset.uri;
  const destPath = DB_DIR + name;
  console.log("Destination path:", destPath);

  // Check if the file already exists
  const fileInfo = await FileSystem.getInfoAsync(destPath);
  console.log("Before copy, file info:", fileInfo);

  if (!fileInfo.exists || fileInfo.size === 0) {
    console.log("Copying file from:", sourceUri);
    await FileSystem.copyAsync({ from: sourceUri, to: destPath });
  }

  const newFileInfo = await FileSystem.getInfoAsync(destPath);
  console.log("After copy, file info:", newFileInfo);
}

async function openDatabaseNative(name: string) {
  // Prepare the database first
  await prepareDatabase(name);
  // Now open the database (expo-sqlite automatically uses the file in FileSystem.documentDirectory/SQLite/)
  return await SQLite.openDatabaseAsync(name);
}

export async function initializeDatabase() {
  return await openDatabaseNative("data.db");
}

export async function executeQuery<T>(
  query: string,
  params: any[] = [],
): Promise<T[]> {
  const db = await initializeDatabase();
  return (await db.getAllAsync(query, params)) as T[];
}
