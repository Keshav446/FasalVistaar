const Product = require("../models/Product");
const Seller = require("../models/Seller");
const ApiError = require("../utils/ApiError");
const { scoreProduct, rankSellers } = require("../utils/scoring");
const { distanceKm } = require("../utils/geo");
const { clearCache } = require("../middleware/cache");

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// GET /api/products?search=&crop=&category=&maxPrice=&verifiedOnly=&sort=&page=&limit=
const listProducts = async (req, res) => {
  const { page, limit, search, crop, category, maxPrice, verifiedOnly, sort } = req.query;

  const filter = {};
  if (search) {
    filter.$or = [
      { name: new RegExp(escapeRegex(search), "i") },
      { brand: new RegExp(escapeRegex(search), "i") },
    ];
  }
  if (crop) filter.crops = crop;
  if (category) filter.category = category;
  if (maxPrice !== undefined) filter.price = { $lte: maxPrice };
  if (verifiedOnly === "true") filter["verification.status"] = "verified";

  const ctx = { crop, budget: maxPrice };
  const total = await Product.countDocuments(filter);
  let items;

  if (sort === "score") {
    // The match score is calculated in code, so rank first and then paginate.
    const all = (await Product.find(filter)).map((d) => ({ ...d.toJSON(), matchScore: scoreProduct(d, ctx) }));
    all.sort((a, b) => b.matchScore - a.matchScore);
    items = all.slice((page - 1) * limit, page * limit);
  } else {
    const order = { price_asc: { price: 1 }, price_desc: { price: -1 }, rating: { rating: -1 } }[sort];
    const docs = await Product.find(filter).sort(order).skip((page - 1) * limit).limit(limit);
    items = docs.map((d) => ({ ...d.toJSON(), matchScore: scoreProduct(d, ctx) }));
  }

  res.json({ success: true, data: items, page, limit, total, pages: Math.ceil(total / limit) });
};

// GET /api/products/:id
const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(404, "Product not found");
  res.json({ success: true, data: { ...product.toJSON(), matchScore: scoreProduct(product) } });
};

// GET /api/products/compare?ids=a,b,c   (2 to 4 products)
const compareProducts = async (req, res) => {
  const { ids, crop, maxPrice } = req.query;
  const docs = await Product.find({ _id: { $in: ids } });
  if (docs.length !== ids.length) throw new ApiError(404, "One or more products were not found");

  const items = docs.map((d) => ({ ...d.toJSON(), matchScore: scoreProduct(d, { crop, budget: maxPrice }) }));
  items.sort((a, b) => b.matchScore - a.matchScore);
  res.json({ success: true, data: { products: items, bestId: items[0].id } });
};

// GET /api/products/:id/sellers?lat=&lng=&maxKm=   -> shops that stock this product, best first
const getProductSellers = async (req, res) => {
  const { lat, lng, maxKm } = req.query;
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(404, "Product not found");

  const sellers = await Seller.find({ stock: { $elemMatch: { product: product._id, inStock: true } } });

  let entries = sellers.map((s) => {
    const stock = s.stock.find((x) => x.product.equals(product._id));
    const knowsPlace = lat !== undefined && lng !== undefined && s.location?.lat != null;
    return {
      id: s.id,
      name: s.name,
      area: s.area,
      phone: s.phone,
      rating: s.rating,
      verified: s.verified,
      price: stock.price,
      distanceKm: knowsPlace ? distanceKm(lat, lng, s.location.lat, s.location.lng) : null,
    };
  });

  if (maxKm !== undefined) entries = entries.filter((e) => e.distanceKm == null || e.distanceKm <= maxKm);

  res.json({ success: true, data: rankSellers(entries) });
};

// POST /api/products   (admin)
const createProduct = async (req, res) => {
  const product = await Product.create({ ...req.body, createdBy: req.user.id });
  clearCache();
  res.status(201).json({ success: true, data: product });
};

// PUT /api/products/:id   (admin)
const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!product) throw new ApiError(404, "Product not found");
  clearCache();
  res.json({ success: true, data: product });
};

// DELETE /api/products/:id   (admin) – also removes it from every seller's stock
const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) throw new ApiError(404, "Product not found");
  await Seller.updateMany({}, { $pull: { stock: { product: product._id } } });
  clearCache();
  res.json({ success: true, message: "Product deleted" });
};

module.exports = { listProducts, getProduct, compareProducts, getProductSellers, createProduct, updateProduct, deleteProduct };