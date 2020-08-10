const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ServiceCategorySchema = new Schema({
  category: {
    type: String,
    required: true,
  },
});

module.exports = ServiceCategory = mongoose.model(
  "servicecategory",
  ServiceCategorySchema
);
