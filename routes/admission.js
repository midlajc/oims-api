var express = require("express");
const roles_list = require("../config/roles_list");
const { verifyRoles } = require("../service/authService");
const router = express.Router();
const admissionService = require("../service/admissionService");

/* GET admin listing. */
router
  .route("/add-applicant")
  .post(verifyRoles(roles_list.Admin, roles_list.Clerk), (req, res) => {
    admissionService
      .addApplicant(req.body)
      .then((responses) => {
        res.status(200).json(responses);
      })
      .catch((err) => {
        res.status(500).json("Internal Server Error");
      });
  });

router
  .route("/applicant-list")
  .get(
    verifyRoles(roles_list.Admin, roles_list.Clerk, roles_list.Manager),
    (req, res) => {
      admissionService
        .applicantList()
        .then((responses) => {
          res.status(200).json(responses);
        })
        .catch((err) => {
          res.status(500).json("Internal Server Error");
        });
    }
  );

router
  .route("/primary-verification")
  .get(verifyRoles(roles_list.Admin, roles_list.Clerk), (req, res) => {
    admissionService
      .primaryVerificationList()
      .then((responses) => {
        res.status(200).json(responses);
      })
      .catch((err) => {
        res.status(500).json("Internal Server Error");
      });
  });

module.exports = router;
