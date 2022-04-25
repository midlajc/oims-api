const express = require("express");
const router = express.Router();
const publicService = require("../service/publicService");

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

module.exports = router;
