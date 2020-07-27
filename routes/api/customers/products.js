const express = require("express");
const router = express.Router();
const passport = require("passport");
const uuid = require("uuidv4");
const Promise = require("bluebird");

const { response } = require("express");

//Load models
const Product = require("../../../models/Product");
const ProductCaregory = require("../../../models/ProductCategory");
const ProductSubCategory = require("../../../models/ProductSubCategory");

router.get("/test", (req, res) => {
  return res.json({ msg: "working" });
});

//@route    GET api/customers/products/productcategories
//@desc     Get available product categories
//@access   Public
router.get(
  "/categories",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
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
  }
);

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
    const products = await Product.find({
      store: store_id,
      sub_category: sub_category_id,
    });

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
