var express = require("express");
const roles_list=require('../config/roles_list')
const { verifyRoles } = require("../service/authService");
var router = express.Router();

/* GET admin listing. */
router
  .route("/add-applicant")
  .post(verifyRoles(roles_list.Admin, roles_list.Clerk), (req, res) => {
    console.log(req.body);
    res.json("respond with a resource");
  });

module.exports = router;
