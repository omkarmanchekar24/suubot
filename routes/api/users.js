const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const uuid = require("uuidv4");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const fast2sms = require("fast-two-sms");

const validateRegisterInput = require("../../validation/register");

const serviceAccount = require("../../nativefirebase-14448-firebase-adminsdk-tm7tl-6698065c1d.json");
const { response } = require("express");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

require("dotenv").config();

//@route    api/users/test
//@desc     Tests users route
//@access   Public
router.get("/test", (req, res) => res.send({ msg: "Users works!" }));

//@route    POST api/users/otp
//@desc     generate otp
//@access   Public
router.post("/otp", (req, res) => {
  console.log("otp");

  //generate otp

  const otp = Math.floor(100000 + Math.random() * 900000);

  //Save to db

  db.collection("otp")
    .doc(req.body.id)
    .set({
      otp: otp,
    })
    .then((response) => {
      //Send message
      fast2sms
        .sendMessage({
          authorization: process.env.API_KEY,
          message: "Your suubot one time password is " + otp,
          numbers: [req.body.mobile],
        })
        .then((response) => {
          res.status(200).json({ msg: "otp sent to user", response });
        })
        .catch((err) => {
          res.status(400).json({ msg: "Otp creation failed", err });
        });
    })
    .catch((err) => res.status(400).json({ msg: "saving otp failed", err }));
});

//@route    POST api/users/register
//@desc     Create user
//@access   Public
router.post("/register", (req, res) => {
  // console.log(req.body);
  // const cityRef = db.collection("otp").doc(req.body.id);

  // const doc = await cityRef.get();
  // if (!doc.exists) {
  //   console.log("No such document!");
  // } else {
  //   console.log("Document data:", doc.data());
  // }

  db.collection("otp")
    .doc(req.body.id)
    .get()
    .then((doc) => {
      //res.json(doc.data().otp.toString() === req.body.otp);

      if (true) {
        const newUser = {
          email: req.body.email,
          password: req.body.password,
          username: req.body.username,
          id: req.body.id,
        };
        const profile = {
          id: req.body.id,
          mobile: req.body.mobile,
          address: req.body.address,
          street: req.body.street,
          town: req.body.town,
          city: req.body.city,
          state: req.body.states,
          pincode: req.body.pincode,
          country: req.body.country,
        };
        db.collection("users")
          .doc(req.body.id)
          .set(newUser)
          .then((user) => {
            //Set profile
            db.collection("profiles")
              .doc(req.body.id)
              .set(profile)
              .then((profile) => {
                console.log(profile);
                //Sign token
                jwt.sign(
                  newUser,
                  keys.secretOrKey,
                  { expiresIn: 3600 },
                  (err, token) => {
                    console.log(token);
                    res.status(200).json({
                      success: true,
                      msg: "User added successfully",
                      token: "Bearer " + token,
                    });
                  }
                );
              })
              .catch((err) =>
                res
                  .status(400)
                  .json({ msg: "Profile creation failed", err: err })
              );
          })
          .catch((err) =>
            res.status(400).json({
              msg: "Register user failed. Please try again after sometime",
              err: err,
            })
          );
      } else {
        res.status(400).json({ success: false, msg: "wrong otp" });
      }
    })
    .catch((err) => {
      res.json({
        msg: "Something went wrong. Please try again after sometime",
      });
    });
});

//@route    POST api/users/store
//@desc     Create store
//@access   Public

router.post("/store", (req, res) => {
  const newStore = {
    name: req.body.name,
    id: uuid.uuid(),
    category: req.body.category,
    address: [
      {
        street: req.body.street,
        town: req.body.town,
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode,
        country: req.body.country,
      },
    ],
    type: req.body.type,
    products: [],
    services: [],
  };

  if (req.body.type === "product") {
    newStore.products.push({
      name: req.body.pname,
      quantity: req.body.pquantity,
      cost: req.body.pcost,
    });
  }

  if (req.body.type === "service") {
    newStore.services.push({
      name: req.body.sname,
      cost: req.body.scost,
    });
  }

  db.collection("stores")
    .add(newStore)
    .then((store) =>
      res.status(200).json({ success: true, msg: "store added successfully" })
    )
    .catch((err) => {
      res.json(err);
    });
});

//@route    POST api/users/service
//@desc     Create service
//@access   Public

module.exports = router;
