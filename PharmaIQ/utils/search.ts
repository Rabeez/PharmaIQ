import Fuse from "fuse.js";

export interface SearchRecord {
  code: number;
  type: "drug" | "brand";
  name: string;
}

export function fuzzySearch(text: string, data: SearchRecord[]) {
  // TODO: see if there is option to skip any records with less-than threshold score
  // to avoid making extra large search results list with bad results
  const options = {
    isCaseSensitive: false,
    includeScore: true,
    minMatchCharLength: 3,
    shouldSort: true,
    keys: ["name"],
  };
  const top = 30;

  const fuse = new Fuse(data, options);
  const result = fuse.search(text.trim());
  const result_items = result
    .slice(0, top)
    .map((obj) => obj.item as SearchRecord);

  return result_items;
}
