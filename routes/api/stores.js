const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

const serviceAccount = require("../../nativefirebase-14448-firebase-adminsdk-tm7tl-6698065c1d.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
const db = admin.firestore();

//@route    GET api/stores/test
//@desc     Tests stores route
//@access   Public
router.get("/test", (req, res) => {
  return res.json({ msg: "Stores working" });
});

//@route    GET api/stores/
//@desc     Get stores by location
//@access   Public
router.get("/", (req, res) => {
  db.collection("stores")
    .get()
    .then((snapshot) => {
      const tempDoc = [];
      snapshot.forEach((doc) => {
        tempDoc.push({ id: doc.id, ...doc.data() });
      });
      return res.status(200).json(tempDoc);
    })
    .catch((err) => {
      res.json({ msg: "err" });
    });
});

module.exports = router;
