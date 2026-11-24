const rateLimit = require("express-rate-limit");

const handler = (req, res) =>
  res.status(429).json({ success: false, message: "Too many requests. Please wait a few minutes and try again." });

// General limit for the whole API
const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 200, standardHeaders: true, legacyHeaders: false, handler });

// Stricter limit for create / update / delete routes
const writeLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: true, legacyHeaders: false, handler });

module.exports = { apiLimiter, writeLimiter };