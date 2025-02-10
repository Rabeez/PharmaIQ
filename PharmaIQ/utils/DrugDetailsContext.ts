import { DrugDetails } from "@/utils/data_interface";
import { createContext, useContext } from "react";

const DrugDetailsContext = createContext<DrugDetails | undefined>(undefined);

export function useDrugDetails() {
  const context = useContext(DrugDetailsContext);
  if (context === undefined) {
    throw new Error("useDrugDetails must be used within a DrugDetailsProvider");
  }
  return context;
}

export default DrugDetailsContext;
