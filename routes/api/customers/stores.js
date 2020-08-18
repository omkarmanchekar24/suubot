const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const uuid = require("uuidv4");
const Promise = require("bluebird");
var ObjectId = require("mongodb").ObjectID;

const { response } = require("express");

//Load Models
const User = require("../../../models/User");
const Product = require("../../../models/Product");
const { child } = require("../../../config/logger");

//@route    GET api/stores/test
//@desc     Tests stores route
//@access   Public
router.get("/test", (req, res) => {
  return res.json({ msg: "Stores working" });
});

//@route    GET api/customers/stores/
//@desc     Get stores by product category id
//@access   Public
router.post("/", async (req, res) => {
  const category = req.body.category_id;

  let stores = await Product.find(
    { category: category },
    { store: 1, _id: 0 }
  ).distinct("store");

  if (stores.length === 0) {
    return res.status(400).json({ msg: "Stores not available" });
  }

  let tempData = [];

  tempData = await Promise.map(stores, async (item) => {
    let temp = await User.find(
      {
        "seller._id": item,
      },
      { _id: 0, seller: { $elemMatch: { _id: item } } }
    );
    return temp[0].seller[0];
  });

  res.status(200).json(tempData);
});

module.exports = router;
