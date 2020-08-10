const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const category = new Schema({
//   _id: Schema.Types.ObjectId,
//   name:
// });

//Create Schema
const StoreSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },

  business_email: {
    type: String,
    required: true,
  },
  business_mobile: {
    type: String,
    required: true,
  },
  categories: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "productcategory",
      },
      category: {
        type: String,
      },
    },
    { _id: false },
    ,
  ],
  business_address: {
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
  paytm: {
    type: String,
  },
  pepay: {
    type: String,
  },
  aboutUs: {
    type: String,
  },
  areaOfDelivery: { type: String, required: true },
  minOrderValue: { type: Number, default: 0 },
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
