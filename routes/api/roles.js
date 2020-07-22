const express = require("express");
const router = express.Router();

//Load Role Model
const Role = require("../../models/Role");

//@route    api/roles/test
//@desc     Tests roles route
//@access   Public
router.get("/test", (req, res) => res.send({ msg: "Roles works!" }));

module.exports = router;
