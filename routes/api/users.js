const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const uuid = require("uuidv4");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const validateRegisterInput = require("../../validation/register");

const serviceAccount = require("../../nativefirebase-14448-firebase-adminsdk-tm7tl-6698065c1d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

//@route    api/users/test
//@desc     Tests users route
//@access   Public
router.get("/test", (req, res) => res.send({ msg: "Users works!" }));

//@route    POST api/users/
//@desc     Create user
//@access   Public
router.post("/", (req, res) => {
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
    state: req.body.state,
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
              res.status(200).json({
                success: true,
                msg: "User added successfully",
                token: "Bearer " + token,
              });
            }
          );
        });
    })
    .catch((err) =>
      res
        .status(400)
        .json({ msg: "Register user failed. Please tru again after sometime" })
    );
});

module.exports = router;
