const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../../config/keys");
const passport = require("passport");

//Load Models
const ServiceCategory = require("../../../models/ServiceCategory");

router.post("/create_category", (req, res) => {
  const data = {
    category: req.body.category,
  };

  const newCategory = new ServiceCategory(data);

  newCategory
    .save()
    .then((category) => {
      return res.json(category);
    })
    .catch((err) => {
      return res.json(err);
    });
});

module.exports = router;
