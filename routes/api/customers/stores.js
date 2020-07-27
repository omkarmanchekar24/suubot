const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const uuid = require("uuidv4");
const Promise = require("bluebird");

const { response } = require("express");

//Load Models
const Store = require("../../../models/Store");
const Product = require("../../../models/Product");

//@route    GET api/stores/test
//@desc     Tests stores route
//@access   Public
router.get("/test", (req, res) => {
  return res.json({ msg: "Stores working" });
});


//@route    GET api/stores/
//@desc     Get stores by product category id
//@access   Public
router.post("/", async (req, res) => {
  try {
    const products = await Product.distinct("store", {
      category: req.body.category_id,
    });

    let stores = [];
    stores = await Promise.map(products, async (item) => {
      let temp = Store.findById(item);
      return temp;
    });

    res.json(stores);
  } catch (error) {
    console.log(err);
  }
});

module.exports = router;
