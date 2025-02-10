import Fuse from "fuse.js";

export interface SearchRecord {
  drug: string;
  brand: string;
}

export function fuzzySearch(text: string, data: SearchRecord[]) {
  // const data = [
  //   {
  //     title: "Old Man's War",
  //     author: "John Scalzi",
  //     tags: ["fiction"],
  //   },
  //   {
  //     title: "The Lock Artist",
  //     author: "Steve",
  //     tags: ["thriller"],
  //   },
  // ];

  const options = {
    isCaseSensitive: false,
    includeScore: true,
    minMatchCharLength: 3,
    shouldSort: true,
    keys: ["drug", "brand"],
  };
  const top = 6;

  const fuse = new Fuse(data, options);
  const result = fuse.search(text.trim());
  const result_items = result.slice(0, top).map((obj) => obj.item as string);

  return result_items;
}
