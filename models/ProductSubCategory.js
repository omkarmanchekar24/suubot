const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ProductSubCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: "productcategory",
  },
});

module.exports = ProductSubCategory = mongoose.model(
  "productsubcategory",
  ProductSubCategorySchema
);
