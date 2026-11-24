const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true, minlength: 2 },
    brand: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: ["Fertilizer", "Irrigation"] },
    crops: { type: [String], validate: [(v) => v.length > 0, "Add at least one crop"] },
    price: { type: Number, required: true, min: 0 },
    unit: { type: String, required: true, trim: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },

    // Fertilizers: nutrient content, e.g. { name: "Nitrogen (N)", percent: 46 }
    ingredients: [
      {
        _id: false,
        name: { type: String, required: true },
        percent: { type: Number, required: true, min: 0, max: 100 },
      },
    ],

    // Irrigation and others: free key/value specs
    specs: { type: Map, of: String, default: undefined },

    verification: {
      status: { type: String, enum: ["verified", "unverified"], default: "unverified" },
      source: { type: String, default: "Not checked" },
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    toJSON: {
      flattenMaps: true,
      transform: (_doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

productSchema.index({ category: 1, price: 1 });
productSchema.index({ crops: 1 });

module.exports = mongoose.model("Product", productSchema);