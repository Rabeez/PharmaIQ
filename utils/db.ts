import { Platform } from "react-native";
import * as nativeDb from "./db.native";
import * as webDb from "./db.web";

// Choose the correct module based on the platform.
const db = Platform.OS === "web" ? webDb : nativeDb;

// Re-export the members with explicit names.
export const initializeDatabase = db.initializeDatabase;
export const executeQuery = db.executeQuery;
