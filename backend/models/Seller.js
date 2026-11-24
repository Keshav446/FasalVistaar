const mongoose = require("mongoose");

// One entry per product the shop sells
const stockSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    price: { type: Number, required: true, min: 0 },
    inStock: { type: Boolean, default: true },
  },
  { _id: false }
);

const sellerSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    name: { type: String, required: true, trim: true, minlength: 2 },
    area: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    verified: { type: Boolean, default: false }, // only an admin can change this
    location: {
      lat: { type: Number, min: -90, max: 90 },
      lng: { type: Number, min: -180, max: 180 },
    },
    stock: [stockSchema],
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

sellerSchema.index({ "stock.product": 1 });

module.exports = mongoose.model("Seller", sellerSchema);