const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const uuid = require("uuidv4");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const messagebird = require("messagebird")("c9f4gUGNroLn7lDVKaowOOmkh");

const validateRegisterInput = require("../../validation/register");

const serviceAccount = require("../../nativefirebase-14448-firebase-adminsdk-tm7tl-6698065c1d.json");
const { response } = require("express");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

//@route    api/users/test
//@desc     Tests users route
//@access   Public
router.get("/test", (req, res) => res.send({ msg: "Users works!" }));

//@route    POST api/users/otp
//@desc     generate otp
//@access   Public
router.post("/otp", (req, res) => {
  messagebird.verify.create(
    req.body.mobile,
    {
      template: "Your one time password is %token.",
    },
    (err, response) => {
      if (err) {
        //Request failed
        //console.log(err.errors[0].description);
        res.status(400).json({ msg: err.errors[0].description });
      } else {
        //Request successfull
        console.log(response);
        res.json.status(200).json(response);
      }
    }
  );
});

//@route    POST api/users/register
//@desc     Create user
//@access   Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  //Check validation

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const id = uuid.uuid();

  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    id: id,
  };

  const profile = {
    id: id,
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
    .add(newUser)
    .then((user) => {
      //Set profile

      db.collection("profiles")
        .add(profile)
        .then((profile) => {
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
        .catch((err) => console.log(err));
    })
    .catch((err) =>
      res
        .status(400)
        .json({ msg: "Register user failed. Please tru again after sometime" })
    );
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
