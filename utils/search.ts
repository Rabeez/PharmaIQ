import Fuse from "fuse.js";
import { Entry } from "./data_interface";

export interface SearchRecord {
  type: "drug" | "brand";
  data: Entry;
}

export function fuzzySearch(text: string, data: SearchRecord[]) {
  const options = {
    isCaseSensitive: false,
    includeScore: true,
    minMatchCharLength: 3,
    shouldSort: true,
    threshold: 0.5,
    keys: ["data.name"],
  };
  const top = 30;

  const fuse = new Fuse(data, options);
  const result = fuse.search(text.trim());
  const result_items = result
    .slice(0, top)
    .map((obj) => obj.item as SearchRecord);

  return result_items;
}
