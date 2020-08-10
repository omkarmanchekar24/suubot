const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//Load Models
const ProductCategory = require("../../../models/ProductCategory");
const ProductSubCategory = require("../../../models/ProductSubCategory");
const Store = require("../../../models/Store");
const Product = require("../../../models/Product");

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
  console.log("hit");
  const categories = await ProductCategory.find();
  const sub_categories = await ProductSubCategory.find();
  return res.json({ categories: categories, sub_categories: sub_categories });
});

module.exports = router;
