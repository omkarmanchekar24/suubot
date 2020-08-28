const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//Load models
const User = require("../../../models/User");

router.post("/editprofile", (req, res) => {
  const {
    _id,
    seller_id,
    name,
    email,
    username,
    gst,
    pan,
    paytm,
    phonepay,
    street,
    town,
    city,
    state,
    pincode,
    country,
    aboutUs,
  } = req.body;

  User.findOne({ _id })
    .then((doc) => {
      seller = doc.seller.id(seller_id);
      seller["name"] = name;
      seller["email"] = email;
      seller["username"] = username;
      seller["gst"] = gst;
      seller["pan"] = pan;
      seller["paytm"] = paytm;
      seller["phonepay"] = phonepay;
      seller["address"]["street"] = street;
      seller["address"]["town"] = town;
      seller["address"]["city"] = city;
      seller["address"]["state"] = state;
      seller["address"]["pincode"] = pincode;
      seller["address"]["country"] = country;
      seller["aboutUs"] = aboutUs;
      doc
        .save()
        .then((seller) => res.status(200).json(seller))
        .catch((err) => res.status(400).json({ msg: "Something went wrong" }));
      //return res.json(doc);
    })
    .catch((err) => {
      res.status(400).json({ msg: "User not found" });
    });
});

router.post("/addstore", (req, res) => {
  const user_id = req.body.user_id;

  const sellerData = {
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    pan: req.body.pan,
    aboutUs: req.body.aboutUs,
    areaOfDelivery: req.body.areaOfDelivery,
    minOrderValue: req.body.minOrderValue,
  };

  sellerData.address = {};
  sellerData.address.street = req.body.street;
  sellerData.address.town = req.body.town;
  sellerData.address.city = req.body.city;
  sellerData.address.state = req.body.state;
  sellerData.address.pincode = parseInt(req.body.pincode);
  sellerData.address.country = req.body.country;

  sellerData.geoLocation = {};
  if (req.body.geoLocation) {
    sellerData.geoLocation.latitude = req.body.geoLocation.latitude;
    sellerData.geoLocation.longitude = req.body.geoLocation.longitude;
  }
  if (req.body.gst) sellerData.gst = req.body.gst;
  if (req.body.paytm) sellerData.paytm = req.body.paytm;
  if (req.body.phonepay) sellerData.phonepay = req.body.phonepay;

  User.findByIdAndUpdate(user_id)
    .then((user) => {
      user.seller.unshift(sellerData);
      user.save().then((user) => res.json(user));
    })
    .catch((err) => res.status(404).json({ usernotfound: "User not found" }));
});

module.exports = router;
