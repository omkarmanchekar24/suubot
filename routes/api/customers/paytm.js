const express = require("express");
const router = express.Router();
const paytmController = require("../controller/paytm/paytm.controller");

//Load Models
const Purchase = require("../../../models/Purchase");

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

router.post("/update_order_status", (req, res) => {
  const order_id = req.body.order_id;
  const status = req.body.status;

  Purchase.findByIdAndUpdate(order_id, { status: status }, { new: true })
    .then((response) => res.json(response))
    .catch((err) => res.json({ err }));
});

module.exports = router;
