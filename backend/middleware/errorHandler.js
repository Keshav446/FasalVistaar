const ApiError = require("../utils/ApiError");

function notFound(req, res, next) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

// Centralised error handling: every error ends up here with the same JSON shape.
// (Express 5 sends errors from async controllers here automatically.)
function errorHandler(err, req, res, next) {
  let status = err.status || 500;
  let message = err.message || "Server error";

  if (err.name === "CastError") { status = 400; message = `Invalid ${err.path}`; }
  if (err.name === "ValidationError") { status = 400; message = Object.values(err.errors).map((e) => e.message).join(", "); }
  if (err.code === 11000) { status = 409; message = "Duplicate value: " + Object.keys(err.keyValue || {}).join(", "); }
  if (err.type === "entity.parse.failed") { status = 400; message = "Invalid JSON in request body"; }

  if (status >= 500) console.error(err);

  res.status(status).json({
    success: false,
    message: status >= 500 && process.env.NODE_ENV === "production" ? "Something went wrong" : message,
    ...(err.details ? { details: err.details } : {}),
  });
}

module.exports = { notFound, errorHandler };