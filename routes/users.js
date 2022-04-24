var express = require('express');
var router = express.Router();
const roles_list = require("../config/roles_list");
const { verifyRoles } = require("../service/authService");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
