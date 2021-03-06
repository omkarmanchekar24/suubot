const express = require("express");
const router = express.Router();
const passport = require("passport");
const uuid = require("uuidv4");
const Promise = require("bluebird");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const { response } = require("express");

//Load models
const Product = require("../../../models/Product");
const ProductCaregory = require("../../../models/ProductCategory");
const ProductSubCategory = require("../../../models/ProductSubCategory");
const Purchase = require("../../../models/Purchase");
const { reset } = require("nodemon");
const { isValidObjectId } = require("mongoose");
const User = require("../../../models/User");
const Seller = User.seller;

router.get("/test", (req, res) => {
  return res.json({ msg: "working" });
});

//@route    GET api/customers/products/categories
//@desc     Get available product categories
//@access   Public
router.get("/categories", async (req, res) => {
  try {
    const categories = await Product.find().distinct("category");
    if (!categories) {
      return res.status(404).json({ msg: "no products available" });
    }

    let tempData = [];

    tempData = await Promise.map(categories, async function (item) {
      let temp = await ProductCaregory.findById(item);
      return temp;
    }).catch((err) => {
      console.log(err);
    });

    return res.json(tempData);
  } catch (err) {
    res.json(err);
  }
});

//@route    GET api/customers/products/productsubcategories
//@desc     Get available product sub categories by store and category
//@access   Public
router.post("/product_sub_categories", async (req, res) => {
  const store = req.body.store;
  const product_category = req.body.product_category;

  try {
    const products = await Product.distinct("sub_category", {
      store: store,
      category: product_category,
    });

    let sub_categories = [];

    sub_categories = await Promise.map(products, async (item) => {
      let temp = await ProductSubCategory.findById(item);
      return temp;
    });

    return res.status(200).json(sub_categories);
  } catch (error) {
    console.log(error);
  }
});

//@route    POST api/customers/products/
//@desc     Get products by store id and sub category id
//@access   Public
router.post("/", async (req, res) => {
  const store_id = req.body.store_id;
  const sub_category_id = req.body.sub_category_id;

  try {
    let products;

    if (sub_category_id === undefined) {
      products = await Product.find({
        store: store_id,
      });
      return res.status(200).json(products);
    }

    products = await Product.find({
      store: store_id,
      sub_category: sub_category_id,
    });

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
});

router.post("/fetch_orders_sellerwise", async (req, res) => {
  const user_id = req.body.user_id;

  try {
    let result = await Purchase.aggregate([
      { $match: { user: ObjectId(user_id), status: "success" } },

      {
        $group: {
          _id: "$store",
          total_amt: { $sum: "$txn_amount" },
        },
      },
    ]);

    let stores = (await User.find())
      .filter((item) => {
        return item.seller.length > 0;
      })
      .map((item) => {
        let store = item.seller.map((item) => {
          return item;
        });
        return store[0];
      });

    let final = [];
    final = result.map((item) => {
      let store = [];
      store = stores.filter((i) => {
        return i._id.toString() === item._id.toString();
      });

      return { store: store[0], ...item };
    });

    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    let monthly = await Purchase.aggregate([
      {
        $match: {
          user: ObjectId(user_id),
          status: "success",
          date: { $gte: firstDay, $lte: lastDay },
        },
      },

      {
        $group: {
          _id: 0,
          total_amt: { $sum: "$txn_amount" },
        },
      },
    ]);

    res.status(200).json({ overAll: final, thisMonth: monthly });
  } catch (error) {
    console.log(error);
  }
});

router.post("/fetch_orders", (req, res) => {
  const user_id = req.body.user_id;

  Purchase.aggregate([
    { $match: { user: ObjectId(user_id), status: "success" } },
  ]).exec((err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

router.post("/fetch_orders_productwise", (req, res) => {
  const user_id = req.body.user_id;

  Purchase.aggregate([
    { $match: { user: ObjectId(user_id), status: "success" } },
    { $project: { _id: 0, products: 1 } },
    { $unwind: "$products" },
    {
      $group: {
        _id: "$products.id",
        total: { $sum: "$products.cost" },
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product",
      },
    },
  ]).exec((err, result) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(result);
  });
});

module.exports = router;
