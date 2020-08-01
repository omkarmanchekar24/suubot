const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const category = new Schema({
//   _id: Schema.Types.ObjectId,
//   name:
// });

//Create Schema
const StoreSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "productcategory",
    },
    { _id: false },
  ],
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  location: {
    longitude: {
      type: String,
    },
    latitude: {
      type: String,
    },
  },
  gst: {
    type: String,
  },
  pan: {
    type: String,
  },
  business_name: {
    type: String,
    required: true,
  },

  paytm: {
    type: String,
  },
  pepay: {
    type: String,
  },
  aboutUs: {
    type: String,
  },
  areaOfDelivery: { type: String },
  minOrderValue: { type: Number },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Store = mongoose.model("stores", StoreSchema);
