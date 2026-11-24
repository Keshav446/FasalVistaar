const express = require("express");
const router = express.Router();

const c = require("../controllers/sellerController");
const { protect, authorize } = require("../middleware/authMiddleware"); // teammate's auth middleware
const validate = require("../middleware/validate");
const { cacheResponse } = require("../middleware/cache");
const { writeLimiter } = require("../middleware/rateLimiter");
const { sellerBody, sellerUpdateBody, stockBody, sellerListQuery } = require("../validators/sellerValidators");

// Public (cached)
router.get("/", validate(sellerListQuery, "query"), cacheResponse(60), c.listSellers);
router.get("/:id", cacheResponse(60), c.getSeller);

// Seller / admin
router.post("/", protect, authorize("seller", "admin"), writeLimiter, validate(sellerBody), c.createSeller);
router.put("/:id", protect, authorize("seller", "admin"), writeLimiter, validate(sellerUpdateBody), c.updateSeller);
router.delete("/:id", protect, authorize("seller", "admin"), writeLimiter, c.deleteSeller);
router.put("/:id/stock", protect, authorize("seller", "admin"), writeLimiter, validate(stockBody), c.upsertStock);
router.delete("/:id/stock/:productId", protect, authorize("seller", "admin"), writeLimiter, c.removeStock);

module.exports = router;