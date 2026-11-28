const Seller = require("../models/Seller");
const Product = require("../models/Product");
const ApiError = require("../utils/ApiError");
const { clearCache } = require("../middleware/cache");

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// A seller may only change their own shop; an admin may change any.
// (req.user is { id, role } from the JWT, set by authMiddleware.protect)
async function getOwnedSeller(req) {
  const seller = await Seller.findById(req.params.id);
  if (!seller) throw new ApiError(404, "Seller not found");
  if (req.user.role !== "admin" && seller.owner.toString() !== req.user.id) {
    throw new ApiError(403, "You can only manage your own shop");
  }
  return seller;
}

// GET /api/sellers?search=&verifiedOnly=&page=&limit=
const listSellers = async (req, res) => {
  const { page, limit, search, verifiedOnly } = req.query;

  const filter = {};
  if (search) {
    filter.$or = [
      { name: new RegExp(escapeRegex(search), "i") },
      { area: new RegExp(escapeRegex(search), "i") },
    ];
  }
  if (verifiedOnly === "true") filter.verified = true;

  const total = await Seller.countDocuments(filter);
  const sellers = await Seller.find(filter).sort({ rating: -1 }).skip((page - 1) * limit).limit(limit);

  res.json({ success: true, data: sellers, page, limit, total, pages: Math.ceil(total / limit) });
};

const STOCK_FIELDS = "name brand unit category price ingredients";

// GET /api/sellers/mine   (seller/admin) – the logged-in user's own shop, or null if none yet
const getMySeller = async (req, res) => {
  const seller = await Seller.findOne({ owner: req.user.id })
    .populate("stock.product", STOCK_FIELDS)
    .lean();
  res.json({ success: true, data: seller });
};

const getSeller = async (req, res) => {
  const seller = await Seller.findById(req.params.id)
    .populate("stock.product", STOCK_FIELDS)
    .lean();
  if (!seller) throw new ApiError(404, "Seller not found");
  res.json({ success: true, data: seller });
};

// POST /api/sellers   (seller or admin) – creates the logged-in user's own shop
const createSeller = async (req, res) => {
  if (await Seller.exists({ owner: req.user.id })) throw new ApiError(409, "You already have a shop");
  const seller = await Seller.create({ ...req.body, owner: req.user.id }); // verified stays false
  clearCache();
  res.status(201).json({ success: true, data: seller });
};

// PUT /api/sellers/:id   (owner or admin). Only an admin can change verified / rating.
const updateSeller = async (req, res) => {
  const seller = await getOwnedSeller(req);
  const { verified, rating, ...rest } = req.body;

  seller.set(rest);
  if (req.user.role === "admin") {
    if (verified !== undefined) seller.verified = verified;
    if (rating !== undefined) seller.rating = rating;
  }

  await seller.save();
  clearCache();
  res.json({ success: true, data: seller });
};

// DELETE /api/sellers/:id   (owner or admin)
const deleteSeller = async (req, res) => {
  const seller = await getOwnedSeller(req);
  await seller.deleteOne();
  clearCache();
  res.json({ success: true, message: "Seller deleted" });
};

// PUT /api/sellers/:id/stock   body: { product, price, quantity } – add a product or update its price/quantity
const upsertStock = async (req, res) => {
  const seller = await getOwnedSeller(req);
  const { product, price, quantity } = req.body;

  if (!(await Product.exists({ _id: product }))) throw new ApiError(404, "Product not found");

  const existing = seller.stock.find((s) => s.product.equals(product));
  if (existing) {
    existing.price = price;
    existing.quantity = quantity;
  } else {
    seller.stock.push({ product, price, quantity });
  }

  await seller.save();
  await seller.populate("stock.product", STOCK_FIELDS);
  clearCache();
  res.json({ success: true, data: seller });
};

// DELETE /api/sellers/:id/stock/:productId
const removeStock = async (req, res) => {
  const seller = await getOwnedSeller(req);
  seller.stock = seller.stock.filter((s) => !s.product.equals(req.params.productId));
  await seller.save();
  await seller.populate("stock.product", STOCK_FIELDS);
  clearCache();
  res.json({ success: true, data: seller });
};

module.exports = { listSellers, getMySeller, getSeller, createSeller, updateSeller, deleteSeller, upsertStock, removeStock };