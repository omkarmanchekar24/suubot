const express = require("express");
const router = express.Router();

//Load Role Model
const Role = require("../../models/Role");

//@route    api/roles/test
//@desc     Tests roles route
//@access   Public
router.get("/test", (req, res) => res.send({ msg: "Roles works!" }));

//@route    POST api/roles/
//@desc     Add a role
//@access   Public
router.post("/", (req, res) => {
  Role.findOne({
    role: req.body.role,
  }).then((role) => {
    if (role) {
      return res.status(400).json({ role: "Role already exists" });
    } else {
      const newRole = new Role({
        role: req.body.role,
      });

      newRole
        .save()
        .then((role) => res.json(role))
        .catch((err) => console.log(err));
    }
  });
});

module.exports = router;
