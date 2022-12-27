const express = require("express");
const router = express.Router();
const publicService = require("../service/publicService");
const dataService = require("../service/dataService");

router.route("/sponsor-registration").post((req, res) => {
  publicService
    .sponsorRegistration(req.body)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.route("/gender").get((req, res) => {
  dataService
    .genderList()
    .then((responses) => {
      res.status(200).json(responses);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
