const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
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

  var count = {};

  db.collection("users")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(function (doc) {
        if (doc.data().email === req.body.email) {
          count.unshift(doc.data().email);
        }
      });
    });

  console.log(count);

  // const citiesRef = db.collection('users');
  // const snapshot = await citiesRef.where('email', '==', req.body.email).get();
  // if (!snapshot.empty) {
  //     console.log('email exists');
  //     return;
  //   }
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
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
    .then((user) => res.status(200).json({ msg: "User added successfully" }))
    .catch((err) => res.json(err));
});

module.exports = router;
