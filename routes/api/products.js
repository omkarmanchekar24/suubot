const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const uuid = require("uuidv4");
const Promise = require("bluebird");

const serviceAccount = require("../../nativefirebase-14448-firebase-adminsdk-tm7tl-6698065c1d.json");
const { response } = require("express");

const db = admin.firestore();

router.get("/test", (req, res) => {
  console.log("test");
  return res.json({ msg: "working" });
});

//@route    GET api/product/
//@desc     Get Products by store_id and sub_type_id
//@access   Public

router.post("/", async (req, res) => {
  const store_id = req.body.store_id;
  const sub_type_id = req.body.sub_type_id;

  const productRef = db.collection("products");
  const snapshot = await productRef.where("store_id", "==", store_id).get();

  if (snapshot.empty) {
    return res.status(404).json("products not available");
  }

  let products = [];
  snapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });

  let final = products.filter((item) => {
    return item.product_sub_type === sub_type_id;
  });

  return res.status(200).json(final);
});

//@route    GET api/products/product_sub_types
//@desc     Get Product sub-types by store_id and product type id
//@access   Public
router.post("/product_sub_types", async (req, res) => {
  const store_id = req.body.store_id;
  const product_type_id = req.body.product_type_id;

  const productsRef = db.collection("products");
  const snapshot = await productsRef.where("store_id", "==", store_id).get();

  if (snapshot.empty) {
    return res.status(404).json({ subtype: "Not available" });
  }
  const data = [];
  snapshot.forEach((doc) => {
    if (doc.exists) {
      data.push(doc.data().product_sub_type);
    }
  });

  let sub_types = [];
  const subRef = db.collection("producttypes").doc(req.body.product_type_id);
  const snap = await subRef.get();
  if (!snap.exists) {
    return res.status(404).json({ subtype: "type not found" });
  }
  //sub_types.push(snap.data().product_sub_type);
  snap.data().product_sub_type.forEach((item) => {
    sub_types.push(item);
  });
  console.log(sub_types);

  //   var arr = [1, 2, 3, 4],
  //     brr = [2, 4],
  //     res = arr.filter((f) => brr.includes(f));
  //   console.log(res);

  var result = sub_types.filter((f) => data.includes(f.id));
  return res.status(200).json(result);
});

module.exports = router;
