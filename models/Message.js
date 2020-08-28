const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  seller: {
    type: Schema.Types.ObjectId,
    ref: "users.seller",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Message = mongoose.model("messages", MessageSchema);
