const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../../config/keys");
const passport = require("passport");
const fast2sms = require("fast-two-sms");

//Load models
const User = require("../../../models/User");
const Store = require("../../../models/Store");
const Otp = require("../../../models/Otp");

require("dotenv").config();

//@route    POST api/seller/otp
//@desc     generate otp
//@access   Public
router.post("/otp", (req, res) => {
  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "email already exists" });
    }

    const ot = Math.floor(100000 + Math.random() * 900000);

    const otp = new Otp({
      email: req.body.email,
      otp: ot,
    });

    //Save otp to db
    otp
      .save()
      .then((otp) => {
        fast2sms
          .sendMessage({
            authorization: process.env.API_KEY,
            message: "Your suubot one time password is " + otp.otp,
            numbers: [req.body.mobile],
          })
          .then((response) => {
            res.status(200).json({
              msg: "otp sent to user",
              response,
            });
          })
          .catch((err) => {
            res.status(400).json({ otp: "Otp creation failed", err });
          });
      })
      .catch((err) => res.json({ err }));
  });
});

//@route    POST api/users/register
//@desc     Create user
//@access   Public
router.post("/register", (req, res) => {
  //Search user by email in otp collection

  Otp.findOne(
    {
      email: req.body.email,
    },
    {},
    { sort: { date: -1 } }
  ).then((otp) => {
    //check otp sent by user

    if (otp.otp === parseInt(req.body.otp)) {
      //Matched

      const data = {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        username: req.body.username,
        password: req.body.password,
      };

      data.address = {};
      data.address.street = req.body.street;
      data.address.town = req.body.town;
      data.address.city = req.body.city;
      data.address.state = req.body.state;
      data.address.pincode = parseInt(req.body.pincode);
      data.address.country = req.body.country;

      const newUser = new User(data);

      newUser
        .save()
        .then((user) => {
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            date: user.date,
            username: user.username,
            address: user.address,
          };

          //Sign Token
          jwt.sign(
            data,
            keys.secretOrKey,
            { expiresIn: 36000 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            }
          );
        })
        .catch((err) => console.log(err));
    } else {
      //Not matched
      return res.json({ otp: "wrong otp" });
    }
  });
});

//@route    POST api/users/login
//@desc     Login user
//@access   Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //find user
  User.findOne({
    email,
  }).then((user) => {
    if (!user) {
      return res.status(400).json({ email: "email not found" });
    }

    //Check password
    if (user.password === password) {
      //password matched

      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        username: user.username,
        address: user.address,
        date: user.date,
      };

      //Sign Token
      jwt.sign(
        payload,
        keys.secretOrKey,
        { expiresIn: 36000 },
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token,
          });
        }
      );
    } else {
      //Password not matched
      return res.status(400).json({ password: "password is incorrect" });
    }
  });
});

module.exports = router;
