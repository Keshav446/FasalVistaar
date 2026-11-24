const { z } = require("zod");

const ingredient = z.object({ name: z.string().min(1), percent: z.number().min(0).max(100) });

const productBody = z.object({
  name: z.string().trim().min(2),
  brand: z.string().trim().min(1),
  category: z.enum(["Fertilizer", "Irrigation"]),
  crops: z.array(z.string().trim().min(1)).min(1, "Add at least one crop"),
  price: z.number().min(0),
  unit: z.string().trim().min(1),
  rating: z.number().min(0).max(5).optional(),
  ingredients: z.array(ingredient).optional(),
  specs: z.record(z.string()).optional(),
  verification: z.object({ status: z.enum(["verified", "unverified"]), source: z.string().min(1) }).optional(),
});

const productUpdateBody = productBody.partial();

const productListQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
  search: z.string().trim().max(60).optional(),
  crop: z.string().trim().optional(),
  category: z.enum(["Fertilizer", "Irrigation"]).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  verifiedOnly: z.enum(["true", "false"]).optional(),
  sort: z.enum(["score", "price_asc", "price_desc", "rating"]).default("score"),
});

const compareQuery = z.object({
  ids: z
    .string()
    .transform((s) => s.split(",").filter(Boolean))
    .pipe(
      z
        .array(z.string().length(24, "Invalid product id"))
        .min(2, "Pick at least 2 products")
        .max(4, "You can compare up to 4 products")
    ),
  crop: z.string().optional(),
  maxPrice: z.coerce.number().min(0).optional(),
});

const productSellersQuery = z.object({
  lat: z.coerce.number().min(-90).max(90).optional(),
  lng: z.coerce.number().min(-180).max(180).optional(),
  maxKm: z.coerce.number().min(1).optional(),
});

module.exports = { productBody, productUpdateBody, productListQuery, compareQuery, productSellersQuery };