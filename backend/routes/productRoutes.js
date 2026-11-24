const express = require("express");
const router = express.Router();

const c = require("../controllers/productController");
const { protect, authorize } = require("../middleware/authMiddleware"); // teammate's auth middleware
const validate = require("../middleware/validate");
const { cacheResponse } = require("../middleware/cache");
const { writeLimiter } = require("../middleware/rateLimiter");
const {
  productBody,
  productUpdateBody,
  productListQuery,
  compareQuery,
  productSellersQuery,
} = require("../validators/productValidators");

// Public (cached)
router.get("/", validate(productListQuery, "query"), cacheResponse(60), c.listProducts);
router.get("/compare", validate(compareQuery, "query"), cacheResponse(60), c.compareProducts); // keep above "/:id"
router.get("/:id", cacheResponse(60), c.getProduct);
router.get("/:id/sellers", validate(productSellersQuery, "query"), cacheResponse(30), c.getProductSellers);

// Admin only
router.post("/", protect, authorize("admin"), writeLimiter, validate(productBody), c.createProduct);
router.put("/:id", protect, authorize("admin"), writeLimiter, validate(productUpdateBody), c.updateProduct);
router.delete("/:id", protect, authorize("admin"), writeLimiter, c.deleteProduct);

module.exports = router;