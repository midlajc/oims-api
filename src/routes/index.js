const express = require("express");
const router = express.Router();
const roles_list = require("../config/roles_list");
const { verifyRoles } = require("../service/authService");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ message: "hello" }).status(200);
});

module.exports = router;
