const express = require("express");
const roles_list = require("../config/roles_list");
const { verifyRoles } = require("../service/authService");
const router = express.Router();
const dataService = require("../service/dataService");

router
  .route("/board-of-studies")
  .get(verifyRoles(roles_list.Data), (req, res) => {
    dataService
      .boardOfStudiesList()
      .then((responses) => {
        res.status(200).json(responses);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

router.route("/standards:_id").get(verifyRoles(roles_list.Data), (req, res) => {
  _id = req.params._id;
  dataService
    .standardsList(_id)
    .then((responses) => {
      res.status(200).json(responses);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.route("/gender").get(verifyRoles(roles_list.Data), (req, res) => {
  dataService
    .genderList()
    .then((responses) => {
      res.status(200).json(responses);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.route("/student-type").get(verifyRoles(roles_list.Data), (req, res) => {
  dataService
    .studentTypeList()
    .then((responses) => {
      res.status(200).json(responses);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
