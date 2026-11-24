const { z } = require("zod");

const sellerBody = z.object({
  name: z.string().trim().min(2),
  area: z.string().trim().min(2),
  phone: z.string().trim().regex(/^[0-9+\-\s]{8,15}$/, "Enter a valid phone number"),
  location: z.object({ lat: z.number().min(-90).max(90), lng: z.number().min(-180).max(180) }).optional(),
});

const sellerUpdateBody = sellerBody
  .extend({ verified: z.boolean(), rating: z.number().min(0).max(5) }) // controller only lets admin use these two
  .partial();

const stockBody = z.object({
  product: z.string().length(24, "Invalid product id"),
  price: z.number().min(0),
  inStock: z.boolean().optional(),
});

const sellerListQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
  search: z.string().trim().max(60).optional(),
  verifiedOnly: z.enum(["true", "false"]).optional(),
});

module.exports = { sellerBody, sellerUpdateBody, stockBody, sellerListQuery };