const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const OtpSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Otp = mongoose.model("otps", OtpSchema);
