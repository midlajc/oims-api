const express = require("express");
const router = express.Router();
const roles_list = require("../config/roles_list");
const { verifyRoles } = require("../service/authService");

router.get("/", (req, res) => {
  res.json("test");
});

module.exports = router;
