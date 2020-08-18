const express = require("express");
const router = express.Router();
const paytmController = require("../controller/paytm/paytm.controller");

//Load Models
const Purchase = require("../../../models/Purchase");
const Product = require("../../../models/Product");

router.get("/request", paytmController.getRequest);
router.post("/request", paytmController.request);
router.post("/response", paytmController.response);

router.post("/save_order", (req, res) => {
  console.log("hit");
  const newOrder = new Purchase({
    user: req.body.user,
    txn_amount: req.body.txn_amount,
    status: req.body.status,
    store: req.body.store,
    products: req.body.products,
  });

  newOrder
    .save()
    .then((order) => {
      res.json(order);
    })
    .catch((err) => res.json({ msg: "server down! please try again later" }));
});

router.post("/update_order_quantity", async (req, res) => {
  const cart = req.body.cart;
  console.log(cart);

  try {
    let update = cart.map(async (item) => {
      let data = await Product.findByIdAndUpdate(
        { _id: item.id },
        {
          $inc: { quantity: -1 * item.quantity },
        }
      );
      return data;
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
