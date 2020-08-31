const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const ObjectId = mongoose.Types.ObjectId;
const messageQueue = require("../../../config/keys").messageQueue;
const admin = require("firebase-admin");

const aws = require("aws-sdk");

//Aws configuration
aws.config.update({
  region: "ap-south-1",
});
const sqs = new aws.SQS({ apiVersion: "2012-11-05" });
const {
  sendBatchedMessages,
  sendBatchedMessagesInParallel,
} = require("sqs-bulk-loader")(sqs);

//Load Models
const User = require("../../../models/User");
const Message = require("../../../models/Message");
const Purchase = require("../../../models/Purchase");

router.post(
  "/",
  // passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const seller_id = req.body.seller;
    const message = req.body.message;

    const seller = await User.aggregate([
      {
        $match: { "seller._id": ObjectId(seller_id) },
      },
      {
        $unwind: "$seller",
      },
      {
        $match: {
          "seller._id": ObjectId(seller_id),
        },
      },
      {
        $project: { _id: 0, seller: 1 },
      },
    ]).exec();

    if (seller) {
      const messageData = new Message({
        seller: seller_id,
        message,
      });
      messageData
        .save()
        .then((message) => res.json(message))
        .catch((err) => console.log(err));
    } else {
      res.status(404).json({ seller: "seller not found" });
    }
  }
);

router.post("/addToQueue", async (req, res) => {
  const seller_id = req.body.seller;
  const message = req.body.message;

  const buyers = await Purchase.aggregate([
    {
      $match: { store: ObjectId(seller_id) },
    },
    {
      $project: {
        user: 1,
        _id: 0,
      },
    },
  ]).exec();

  if (!buyers) return res.status(400).json({ nousers: "No users found" });

  let messages = [];

  messages = buyers.map((item) => {
    return { seller: seller_id, user: item.user, message, status: "pending" };
  });

  Message.insertMany(messages)
    .then(async (messages) => {
      let queueData = messages.map((item) => {
        return {
          Id: item._id.toString(),
          MessageBody: `{
            "seller": "${seller_id}",
            "user": "${item.user}",
            "message": "${item.message}",
            "date": "${item.date}",        
          }
          `,
        };
      });

      const response = await sendBatchedMessages(messageQueue, queueData);

      return res.status(200).json(response);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

module.exports = router;
