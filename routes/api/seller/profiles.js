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
        .catch((err) => res.status(400).json(err));
      //return res.json(doc);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
