const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const uuid = require("uuidv4");
const Promise = require("bluebird");

const serviceAccount = require("../../nativefirebase-14448-firebase-adminsdk-tm7tl-6698065c1d.json");
const { response } = require("express");

const db = admin.firestore();

//@route    GET api/stores/test
//@desc     Tests stores route
//@access   Public
router.get("/test", (req, res) => {
  return res.json({ msg: "Stores working" });
});

//@route    POST api/stores/products_sub_types
//@desc     Add product_sub_type
//@access   Public
router.post("/product_sub_type", (req, res) => {
  const sub_type = [
    {
      name: "soap",
      id: db.collection("producttypes").doc().id,
    },
    {
      name: "detergent",
      id: db.collection("producttypes").doc().id,
    },
    {
      name: "grains",
      id: db.collection("producttypes").doc().id,
    },
    {
      name: "toiletries",
      id: db.collection("producttypes").doc().id,
    },
    {
      name: "readyfood",
      id: db.collection("producttypes").doc().id,
    },
    {
      name: "supplimemts",
      id: db.collection("producttypes").doc().id,
    },
  ];

  db.collection("producttypes")
    .doc(req.body.id)
    .update({
      product_sub_type: sub_type,
    })
    .then((product_sub_type) => {
      return res.json(product_sub_type);
    })
    .catch((err) => {
      return res.json(err);
    });
});

//@route    POST api/stores/
//@desc     Add stores
//@access   Public
router.post("/", (req, res) => {
  const newStore = {
    name: req.body.name,
    address: req.body.address,
    cords: req.body.cords,
    products: [],
    services: [],
  };

  if (req.body.products) {
    newStore.products.push(req.body.products);
  }

  if (req.body.services) {
    newStore.services.push(req.body.services);
  }

  db.collection("stores")
    .doc()
    .set(newStore)
    .then((store) => {
      return res.json(store);
    })
    .catch((err) => {
      return res.json(err);
    });
});

//@route    POST api/stores/servicetype
//@desc     Add service type
//@access   Public
router.post("/servicetypes", (req, res) => {
  const service = {
    name: req.body.name,
  };

  db.collection("servicetypes")
    .doc()
    .set(service)
    .then((service) => {
      return res.json(service);
    })
    .catch((err) => res.json(err));
});

//@route    POST api/stores/producttype
//@desc     Add product type
//@access   Public
router.post("/producttypes", (req, res) => {
  const product = {
    name: req.body.name,
  };

  db.collection("producttypes")
    .doc()
    .set(product)
    .then((product) => {
      return res.json(product);
    })
    .catch((err) => res.json(err));
});

//@route    POST api/stores/products
//@desc     Add products
//@access   Public
router.post("/products", (req, res) => {
  const product = {
    product_type_id: req.body.product_type_id,
    name: req.body.name,
    cost: req.body.cost,
    product_sub_type: req.body.product_subtype_id,
    store_id: req.body.store_id,
  };

  db.collection("products")
    .doc()
    .set(product)
    .then((product) => {
      return res.json(product);
    })
    .catch((err) => {
      return res.json(err);
    });
});

//@route    GET api/stores/product_types
//@desc     Get product types
//@access   Public
router.get("/product", (req, res) => {
  db.collection("products")
    .get()
    .then((snapshot) => {
      const tempDoc = [];
      snapshot.forEach((doc) => {
        tempDoc.push({ id: doc.id, ...doc.data() });
      });
      return res.json(tempDoc);
    })
    .catch((err) => {
      return res.status(400).json({ msg: "Something went wrong" });
    });
});

//@route    GET api/stores/product_types
//@desc     Get product types
//@access   Public
router.get("/product_types", (req, res) => {
  db.collection("producttypes")
    .get()
    .then((snapshot) => {
      const tempDoc = [];
      snapshot.forEach((doc) => {
        tempDoc.push({ id: doc.id, ...doc.data() });
      });
      return res.json(tempDoc);
    })
    .catch((err) => {
      return res.status(400).jsin({ msg: "something went wrong" });
    });
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
      res.json({ stores: "unable to fetch stores" });
    });
});

//@route    POST api/stores/product_type_id
//@desc     POST RETURNS stores by product type id
//@access   Public
router.post("/product_type_id", async (req, res) => {
  const type_id = req.body.product_type_id;

  const productsRef = db.collection("products");
  const snapshot = await productsRef
    .where("product_type_id", "==", type_id)
    .get();
  if (snapshot.empty) {
    return res.status(404).json({ msg: "No items found" });
  }
  const data = [];
  snapshot.forEach((doc) => {
    data.push(doc.data().store_id);
  });

  let unique = data.filter((item, i, ar) => ar.indexOf(item) === i);

  let stores = [];

  stores = await Promise.map(unique, async function (item) {
    const storeRef = db.collection("stores").doc(item);
    const doc = await storeRef.get();
    return { id: doc.id, ...doc.data() };
  }).catch((err) => console.log({ err }));

  return res.status(200).json(stores);
});

module.exports = router;
