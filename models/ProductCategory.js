const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ProductCategorySchema = new Schema({
  category: {
    type: String,
    required: true,
  },
});

module.exports = ProductCategory = mongoose.model(
  "productcategory",
  ProductCategorySchema
);
