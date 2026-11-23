
const express = require("express");
const router = express.Router();

// Import controllers
const {
  registerUser,
  loginUser
} = require("../controllers/authController");

// Import middleware
const {
  protect,
  authorize
} = require("../middleware/authMiddleware");

// Registration
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Protected route
router.get("/me", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "You are authenticated!",
    user: req.user,
  });
});

// Farmer-only route
router.get(
  "/farmer-dashboard",
  protect,
  authorize("farmer"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome to Farmer Dashboard!",
    });
  }
);

// Seller-only route
router.get(
  "/seller-dashboard",
  protect,
  authorize("seller"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome to Seller Dashboard!",
    });
  }
);

// Admin-only route
router.get(
  "/admin-dashboard",
  protect,
  authorize("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome to Admin Dashboard!",
    });
  }
);

module.exports = router;
