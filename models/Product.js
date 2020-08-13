const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  store: {
    type: Schema.Types.ObjectId,
    ref: "users.seller",
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "productcategory",
  },
  sub_category: {
    type: Schema.Types.ObjectId,
    ref: "productsubcategory",
  },
  unit: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Product = mongoose.model("products", ProductSchema);
