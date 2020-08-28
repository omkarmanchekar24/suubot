const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

//Load Models
const ProductCategory = require("../../../models/ProductCategory");
const ProductSubCategory = require("../../../models/ProductSubCategory");
const Store = require("../../../models/Store");
const Product = require("../../../models/Product");
const { response } = require("../controller/paytm/paytm.controller");

//@route    POST api/seller/createcategory
//@desc     Create category
//@access   Public
router.post("/createcategory", (req, res) => {
  const category = new ProductCategory({
    category: req.body.category,
  });

  category
    .save()
    .then((category) => res.json(category))
    .catch((err) => res.json(err));
});

//@route    POST api/users/store
//@desc     Create store
//@access   Public

router.post("/createstore", (req, res) => {
  const storeFields = {};

  storeFields.name = req.body.name;
  storeFields.email = req.body.email;
  storeFields.mobile = req.body.mobile;

  storeFields.address = {};
  storeFields.address.street = req.body.street;
  storeFields.address.town = req.body.town;
  storeFields.address.city = req.body.city;
  storeFields.address.state = req.body.state;
  storeFields.address.pincode = req.body.pincode;
  storeFields.address.country = req.body.country;

  storeFields.location = {};
  if (req.body.longitude) storeFields.location.longitude = req.body.longitude;
  if (req.body.latitude) storeFields.location.latitude = req.body.latitude;

  if (req.body.gst) storeFields.gst = req.body.gst;
  if (req.body.pan) storeFields.pan = req.body.pan;
  if (req.body.paytm) storeFields.paytm = req.body.paytm;
  if (req.body.pepay) storeFields.phonepay = req.body.phonepay;
  if (req.body.aboutUs) storeFields.aboutUs = req.body.aboutUs;
  if (req.body.areaOfDelivery)
    storeFields.areaOfDelivery = req.body.areaOfDelivery;

  if (req.body.areaOfDelivery)
    storeFields.areaOfDelivery = req.body.areaOfDelivery;
  if (req.body.minOrderValue)
    storeFields.minOrderValue = req.body.minOrderValue;

  storeFields.business_name = req.body.business_name;
  storeFields.password = req.body.password;

  //Save store
  new Store(storeFields)
    .save()
    .then((store) => res.json(store))
    .catch((err) => res.json(err));
});

//@route    POST api/customers/stores/addsubcategory
//@desc     Create sub category by category id
//@access   Public
router.post("/addsubcategory", (req, res) => {
  const category_id = req.body.category;
  const name = req.body.name;

  const subCategory = new ProductSubCategory({
    name,
    category_id,
  });

  subCategory
    .save()
    .then((subCategory) => res.json(subCategory))
    .catch((err) => console.log(err));
});

//@route    POST api/seller/stores/addproduct
//@desc     Add product
//@access   Public
router.post("/addproduct", (req, res) => {
  const productFields = {};

  productFields.name = req.body.name;
  productFields.store = req.body.store;
  productFields.category = req.body.category;
  productFields.sub_category = req.body.sub_category;
  productFields.unit = req.body.unit;
  if (req.body.weight) productFields.weight = req.body.weight;
  productFields.quantity = req.body.quantity;
  productFields.cost = req.body.cost;

  const newProduct = new Product(productFields);
  newProduct
    .save()
    .then((product) => res.json(product))
    .catch((err) => res.json(err));
});

router.post("/getcategories", async (req, res) => {
  const categories = await ProductCategory.find();
  const sub_categories = await ProductSubCategory.find();
  return res.json({ categories: categories, sub_categories: sub_categories });
});

router.post("/editproduct", async (req, res) => {
  const { _id, name, weight, quantity, cost, unit } = req.body;
  console.log("hit");
  Product.findByIdAndUpdate(
    { _id },
    {
      $set: {
        name,
        weight,
        quantity,
        cost,
        unit,
      },
    }
  )
    .then((product) => {
      res.json(product);
    })
    .catch((err) => res.status(400).json({ error: "Something went wrong" }));
});

router.delete("/deleteproduct", (req, res) => {
  const { _id } = req.body;
  console.log("id:" + _id);

  Product.deleteOne({ _id })
    .then((response) => {
      return res.status(200).json({ success: true });
    })
    .catch((err) => res.status(400).json({ msg: "Something went wrong!" }));
});

router.post("/getproducts", async (req, res) => {
  const { _id } = req.body;
  console.log(_id);
  const categories = await ProductCategory.find();
  const sub_categories = await ProductSubCategory.find();
  const products = await Product.find({ store: _id });

  return res.json({ categories, sub_categories, products });
});

router.post("/fetch_orders_productwise", (req, res) => {
  const store_id = req.body.store_id;

  Purchase.aggregate([
    { $match: { store: ObjectId(store_id), status: "success" } },
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

router.post("/fetch_orders_clientwise", async (req, res) => {
  const store_id = req.body.store_id;
  console.log(store_id);
  try {
    let result = await Purchase.aggregate([
      { $match: { store: ObjectId(store_id), status: "success" } },

      {
        $group: {
          _id: "$user",
          total_amt: { $sum: "$txn_amount" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "client",
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

router.post("/fetch_orders_inventorywise", (req, res) => {
  const store_id = req.body.store_id;

  Product.find({ store: store_id })
    .then((products) => res.status(200).json(products))
    .catch((err) => res.status(404).json(err));
});

module.exports = router;
