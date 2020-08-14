const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const uuid = require("uuidv4");
const Promise = require("bluebird");

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

//@route    GET api/stores/
//@desc     Get stores by product category id
//@access   Public
router.post("/", async (req, res) => {
  const category = req.body.category_id;

  try {
    const users = await User.find({
      "seller.categories._id": category,
    });

    if (users) {
      let stores = [];

      users.forEach((item) => {
        item.seller.forEach((item) => {
          stores.push(item);
        });
      });

      res.status(200).json(stores);
    } else {
      res.status(404).json({ msg: "stores not found" });
    }
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
