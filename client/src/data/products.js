// DUMMY DATA – replace with API data (productService.js) once the server exists.
// verification.source: which government list the claim can be checked against.
export const products = [
  { id: "p1", name: "Urea (46% N)", brand: "IFFCO", category: "Fertilizer", crops: ["Wheat", "Rice", "Maize"],
    price: 266, unit: "45 kg bag", rating: 4.6, ingredients: [{ name: "Nitrogen (N)", percent: 46 }],
    verification: { status: "verified", source: "FCO 1985 – Schedule I" }, sellerIds: ["s1", "s2", "s3"] },
  { id: "p2", name: "DAP (18-46-0)", brand: "Coromandel", category: "Fertilizer", crops: ["Wheat", "Mustard", "Rice"],
    price: 1350, unit: "50 kg bag", rating: 4.4, ingredients: [{ name: "Nitrogen (N)", percent: 18 }, { name: "Phosphorus (P2O5)", percent: 46 }],
    verification: { status: "verified", source: "FCO 1985 – Schedule I" }, sellerIds: ["s1", "s3"] },
  { id: "p3", name: "NPK 10-26-26", brand: "IFFCO", category: "Fertilizer", crops: ["Mustard", "Maize", "Cotton"],
    price: 1470, unit: "50 kg bag", rating: 4.2, ingredients: [{ name: "Nitrogen (N)", percent: 10 }, { name: "Phosphorus (P2O5)", percent: 26 }, { name: "Potash (K2O)", percent: 26 }],
    verification: { status: "verified", source: "FCO 1985 – Schedule I" }, sellerIds: ["s2", "s3"] },
  { id: "p4", name: "Bio NPK Liquid Mix", brand: "GreenGro", category: "Fertilizer", crops: ["Wheat", "Mustard"],
    price: 780, unit: "5 L", rating: 3.9, ingredients: [{ name: "Nitrogen (N)", percent: 5 }, { name: "Phosphorus (P2O5)", percent: 5 }, { name: "Potash (K2O)", percent: 5 }],
    verification: { status: "unverified", source: "No FCO entry found" }, sellerIds: ["s2"] },
  { id: "p5", name: "Drip Irrigation Kit (1 acre)", brand: "Jain", category: "Irrigation", crops: ["Cotton", "Maize", "Mustard"],
    price: 24500, unit: "kit", rating: 4.5, ingredients: [], specs: { "Water saving": "Up to 50%", Warranty: "2 years", Coverage: "1 acre" },
    verification: { status: "verified", source: "BIS marked (IS 13488)" }, sellerIds: ["s1", "s4"] },
  { id: "p6", name: "Sprinkler Set (10 nozzles)", brand: "Finolex", category: "Irrigation", crops: ["Wheat", "Mustard", "Rice"],
    price: 9800, unit: "set", rating: 4.1, ingredients: [], specs: { "Water saving": "Up to 30%", Warranty: "1 year", Coverage: "0.5 acre" },
    verification: { status: "unverified", source: "No certificate uploaded" }, sellerIds: ["s4"] },
];
export const CROPS = ["Wheat", "Rice", "Maize", "Mustard", "Cotton"];
export const CATEGORIES = ["Fertilizer", "Irrigation"];