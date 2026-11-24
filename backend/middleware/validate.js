const ApiError = require("../utils/ApiError");

// validate(schema, "body" | "query") – checks the input with Zod and replaces it with the clean version.
const validate = (schema, source = "body") => (req, res, next) => {
  const result = schema.safeParse(req[source]);
  if (!result.success) {
    const details = result.error.issues.map((i) => ({ field: i.path.join("."), message: i.message }));
    return next(new ApiError(400, "Validation failed", details));
  }
  // Express 5 makes req.query read-only, so define the property instead of assigning it.
  Object.defineProperty(req, source, { value: result.data, writable: true, configurable: true, enumerable: true });
  next();
};

module.exports = validate;