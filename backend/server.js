require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const { apiLimiter } = require("./middleware/rateLimiter");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

// Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL,
  exposedHeaders: ["X-Cache"]   // lets the browser read the cache HIT/MISS header
}));

app.use(express.json({ limit: "100kb" }));

// Rate limit every /api request (returns HTTP 429 when exceeded)
app.use("/api", apiLimiter);

// Authentication Routes
app.use("/api/auth", authRoutes);

// Product + Seller Routes
app.use("/api/products", productRoutes);
app.use("/api/sellers", sellerRoutes);

// Test API
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to FasalVistaar Backend!"
  });
});

// Health check API
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "FasalVistaar API is running!",
    database: "Connected"
  });
});

// Must stay LAST: unknown routes and all errors
app.use(notFound);
app.use(errorHandler);

// Start server after database connection
const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();