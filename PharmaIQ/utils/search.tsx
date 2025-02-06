import { ItemType } from "@/app/item";
import Fuse from "fuse.js";

export function fuzzySearch(text: string) {
  const data = [
    {
      title: "Old Man's War",
      author: "John Scalzi",
      tags: ["fiction"],
    },
    {
      title: "The Lock Artist",
      author: "Steve",
      tags: ["thriller"],
    },
  ];

  const options = {
    isCaseSensitive: false,
    includeScore: true,
    // Search in `author` and in `tags` array
    keys: ["author", "tags"],
  };

  const fuse = new Fuse(data, options);
  const result = fuse.search(text.trim());
  const result_items = result.map((obj) => obj.item as ItemType);

  return result_items;
}
