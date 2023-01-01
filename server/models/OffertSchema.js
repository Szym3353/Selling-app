const { model, Schema } = require("mongoose");

const OffertSchema = new Schema(
  {
    title: String,
    description: String,
    price: Number,
    inStock: Number,
    bought: Number,
    category: String,
    photos: [],
    author: { id: String, username: String },
    discount: { value: Number, expire: String },
  },
  { collection: "offert" }
);

module.exports = model("Offert", OffertSchema);
