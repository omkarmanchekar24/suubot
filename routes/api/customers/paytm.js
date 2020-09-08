const express = require("express");
const router = express.Router();
const paytmController = require("../controller/paytm/paytm.controller");
const fast2sms = require("fast-two-sms");

//Load Models
const Purchase = require("../../../models/Purchase");
const Product = require("../../../models/Product");

router.get("/request", paytmController.getRequest);
router.post("/request", paytmController.request);
router.post("/response", paytmController.response);

router.post("/save_order", (req, res) => {
  const newOrder = new Purchase({
    user: req.body.user,
    txn_id: req.body.txn_id,
    txn_amount: req.body.txn_amount,
    status: req.body.status,
    resp_code: req.body.resp_code,
    store: req.body.store,
    products: req.body.products,
  });

  newOrder
    .save()
    .then((order) => {
      if (order.status === "SUCCESS") {
        //Update products quantity

        try {
          let update = order.products.map(async (item) => {
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

        //Sent message to buyer

        fast2sms
          .sendMessage({
            authorization: process.env.API_KEY,
            message: `Your has been placed successfully! Transaction Id: ${order.txn_id}, Transaction Amount: ${order.txn_amount}, Status: ${order.status}`,
            numbers: [req.body.mobile],
          })
          .then((response) => {
            res.status(200).json({
              msg: "Message sent",
              response,
            });
          })
          .catch((err) => {
            res.status(400).json({ msg: "Message sending failed" });
          });
      } else {
      }
      res.json(order);
    })
    .catch((err) => res.json({ msg: "server down! please try again later" }));
});

router.post("/update_order_quantity", async (req, res) => {
  const cart = req.body.cart;

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
