const express = require("express");
const router = express.Router();
const roles_list = require("../config/roles_list");
const { verifyRoles } = require("../service/authService");
const sponsorshipService = require("../service/sponsorshipsService");
router
  .route("/new-sponsorship")
  .post(
    verifyRoles(roles_list.Admin, roles_list.Clerk, roles_list.Manager),
    (req, res) => {
      sponsorshipService
        .newSponsorship(req.body)
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    }
  );

router
  .route("/sponsorship-list")
  .get(verifyRoles(roles_list.Admin, roles_list.Clerk), (req, res) => {
    sponsorshipService
      .sponsorshipList()
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

module.exports = router;
