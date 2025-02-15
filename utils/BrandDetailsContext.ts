import { BrandDetails } from "@/utils/data_interface";
import { createContext, useContext } from "react";

const BrandDetailsContext = createContext<BrandDetails | undefined>(undefined);

export function useBrandDetails() {
  const context = useContext(BrandDetailsContext);
  if (context === undefined) {
    throw new Error(
      "useBrandDetails must be used within a BrandDetailsProvider",
    );
  }
  return context;
}

export default BrandDetailsContext;
