const categoryMapping: Record<string, string> = {
  // Tablets
  Tabs: "tablets",
  "Tabs SR": "tablets",
  "Tabs efr": "tablets",
  "Tabs Chewable": "tablets",
  "Tabs DS": "tablets",
  "Tabs SL": "tablets",
  "Tab Enteric coated": "tablets",
  "Paed Tab": "tablets",
  Dragees: "tablets",

  // Capsules
  Caps: "capsules",
  "Caps SR": "capsules",
  "Soft Caps": "capsules",
  Caplet: "capsules",
  "Rota Caps": "capsules",
  "Comp Tabs": "capsules",

  // Syrups (includes suspensions, solutions, etc.)
  Syrup: "syrup",
  Susp: "syrup",
  "Dry Susp": "syrup",
  Soln: "syrup",
  "Oral Soln": "syrup",
  "Susp DS": "syrup",
  Linctus: "syrup",
  Powder: "syrup",
  Sachet: "syrup",
  Liquid: "syrup",
  Elixir: "syrup",

  // Sprays
  Spray: "spray",
  "Nasal Spray": "spray",
  "Mouth Spray": "spray",
  Aerosol: "spray",

  // Drops
  Drops: "drops",
  "Eye Drops": "drops",
  "Ear Drops": "drops",
  "E and E Drops": "drops",
  "Nasal Drops": "drops",
  "Eye Susp": "drops",

  // Injections (includes infusions, etc.)
  Inj: "injection",
  "Inj-IV": "injection",
  "Inj-IM": "injection",
  "Inj IM/IV": "injection",
  "Inj CS": "injection",
  "Inj SR": "injection",
  "Inj SC": "injection",
  "Inj DS": "injection",
  "Spinal  Inj": "injection",
  "Comp Inj": "injection",
  Inf: "injection",

  // Tube (for creams, lotions, ointments, etc.)
  Cream: "tube",
  Lotion: "tube",
  Oint: "tube",
  "Eye Oint": "tube",
  Gel: "tube",
  Paste: "tube",
  "Vag Cream": "tube",
  "Tooth Paste": "tube",
};

function mapCategory(originalCategory: string): string {
  return categoryMapping[originalCategory] || "Other";
}

// // Example usage:
// const originalCategories = [
//   "Tabs",
//   "Syrup",
//   "Susp",
//   "Inj",
//   "Drops",
//   "UnknownCategory",
// ];
//
// const mappedCategories = originalCategories.map(mapCategory);
// console.log(mappedCategories);
// // Output: [ 'Tablet', 'Syrup', 'Syrup', 'Injection', 'Drops', 'Other' ]
