
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL
}));

app.use(express.json());

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
