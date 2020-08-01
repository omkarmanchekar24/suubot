const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubSchema = new Schema(
  [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: "products",
      },
      name: {
        type: String,
        required: true,
      },
      category: {
        type: Schema.Types.ObjectId,
        ref: "productcategory",
      },
      sub_category: {
        type: Schema.Types.ObjectId,
        ref: "productsubcategory",
      },
      cost: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  { _id: false }
);

const PurchaseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  txn_amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  store: {
    type: Schema.Types.ObjectId,
    ref: "stores",
  },
  products: [SubSchema],
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Purchase = mongoose.model("purchases", PurchaseSchema);
