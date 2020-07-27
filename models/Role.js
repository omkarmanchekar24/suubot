const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const RoleSchema = new Schema({
  role: {
    type: String,
    required: true,
  },
});

module.exports = Role = mongoose.model("roles", RoleSchema);
