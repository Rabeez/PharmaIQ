import Fuse from "fuse.js";

export interface SearchRecord {
  type: "drug" | "brand";
  name: string;
}

export function fuzzySearch(text: string, data: SearchRecord[]) {
  const options = {
    isCaseSensitive: false,
    includeScore: true,
    minMatchCharLength: 3,
    shouldSort: true,
    keys: ["name"],
  };
  const top = 6;

  const fuse = new Fuse(data, options);
  const result = fuse.search(text.trim());
  const result_items = result
    .slice(0, top)
    .map((obj) => obj.item as SearchRecord);

  return result_items;
}
