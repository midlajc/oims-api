const express = require("express");
const router = express.Router();
const roles_list = require("../config/roles_list");
const { verifyRoles } = require("../service/authService");
const sponsorService = require("../service/sponsorService");

router
  .route("/sponsor-application")
  .get(
    verifyRoles(roles_list.Admin, roles_list.Clerk, roles_list.Manager),
    (req, res) => {
      sponsorService
        .sponsorApplications()
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    }
  )
  .put(verifyRoles(roles_list.Admin, roles_list.Manager), (req, res) => {
    let application_id = req.body.application_id;
    sponsorService
      .approveSponsorApplication(application_id)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

module.exports = router;
