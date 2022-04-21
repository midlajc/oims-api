var express = require("express");
const roles_list = require("../config/roles_list");
const { verifyRoles } = require("../service/authService");
const router = express.Router();
const admissionService = require("../service/admissionService");

/* GET admin listing. */
router
  .route("/add-applicant")
  .post(verifyRoles(roles_list.Admin, roles_list.Clerk), (req, res) => {
    admissionService.addApplicant(req.body).then((response) => {
      res.json(response);
    });

  });

module.exports = router;
