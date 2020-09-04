const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../../config/keys");
const passport = require("passport");
const fast2sms = require("fast-two-sms");

//Load models
const User = require("../../../models/User");
const Otp = require("../../../models/Otp");
const Role = require("../../../models/Role");

const validateRegisterInput = require("../../../validation/register");

require("dotenv").config();

//@route    api/users/test
//@desc     Tests users route
//@access   Public
router.get("/test", (req, res) => res.json({ msg: "Users works!" }));

//@route    POST api/users/otp
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
router.post("/register", async (req, res) => {
  //Search user by email in otp collection

  const roles = await Role.find();

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
      data.address.street = req.body.address.street;
      data.address.town = req.body.address.town;
      data.address.city = req.body.address.city;
      data.address.state = req.body.address.state;
      data.address.pincode = req.body.address.pincode;
      data.address.country = req.body.address.country;

      data.geoLocation = {};
      if (req.body.geoLocation) {
        data.geoLocation.latitude = req.body.geoLocation.latitude;
        data.geoLocation.longitude = req.body.geoLocation.longitude;
      }

      data.roles = [];
      let role = [];
      role = roles.filter((item) => {
        return item.name === "Customer";
      });

      data.roles.push(role[0]);

      if (req.body.seller) {
        data.seller = [];
        let store = {};
        store.name = req.body.seller.name;
        store.email = req.body.seller.email;
        store.username = req.body.seller.username;

        store.categories = req.body.seller.categories;

        store.gst = req.body.seller.gst;
        store.pan = req.body.seller.pan;
        store.paytm = req.body.seller.paytm;
        store.phonepay = req.body.seller.phonepay;
        store.aboutUs = req.body.seller.aboutUs;
        store.areaOfDelivery = req.body.seller.areaOfDelivery;
        store.minOrderValue = req.body.seller.minOrderValue;

        store.address = {};

        store.address.street = req.body.seller.address.street;

        store.address.town = req.body.seller.address.town;

        store.address.city = req.body.seller.address.city;

        store.address.state = req.body.seller.address.state;

        store.address.pincode = req.body.seller.address.pincode;

        store.address.country = req.body.seller.address.country;

        if (req.body.seller.geoLocation) {
          store.geoLocation.latitude = req.body.seller.geoLocation.latitude;
          store.geoLocation.longitude = req.body.seller.geoLocation.longitude;
        }
        data.seller.push(store);
        role = roles.filter((item) => {
          return item.name === "Seller";
        });
        data.roles.push(role[0]);
      }

      if (req.body.professional) {
        data.professional = [];
        let profession = {};
        profession.name = req.body.professional.name;

        profession.email = req.body.professional.email;

        profession.username = req.body.professional.username;

        profession.mobile = req.body.professional.mobile;

        profession.category = req.body.professional.category;

        profession.gst = req.body.professional.gst;

        profession.pan = req.body.professional.pan;

        profession.paytm = req.body.professional.paytm;

        profession.phonepay = req.body.professional.phonepay;

        profession.aboutUs = req.body.professional.aboutUs;

        profession.address = {};

        profession.address.street = req.body.professional.address.street;

        profession.address.town = req.body.professional.address.town;

        profession.address.city = req.body.professional.address.city;

        profession.address.state = req.body.professional.address.state;

        profession.address.pincode = req.body.professional.address.pincode;

        profession.address.country = req.body.professional.address.country;

        profession.geoLocation = {};
        if (req.body.professional.geoLocation) {
          profession.geoLocation.latitude =
            req.body.professional.geoLocation.latitude;

          profession.geoLocation.longitude =
            req.body.professional.geoLocation.longitude;
        }
        data.professional.push(profession);
        role = roles.filter((item) => {
          return item.name === "Professional";
        });
        data.roles.push(role[0]);
      }

      const newUser = new User(data);

      newUser
        .save()
        .then((user) => {
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
        seller: user.seller,
        professional: user.professional,
      };
      if (user.geoLocation) {
        payload.geoLocation = {};
        payload.geoLocation.latitude = user.geoLocation.latitude;
        payload.geoLocation.longitude = user.geoLocation.longitude;
      }

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

router.post("/editprofile", (req, res) => {
  const _id = req.body._id;

  const profileData = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    mobile: req.body.mobile,
    address: {
      street: req.body.street,
      town: req.body.town,
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,
      country: req.body.country,
    },
  };

  User.findByIdAndUpdate(_id, profileData, { new: true })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
