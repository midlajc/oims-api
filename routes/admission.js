const express = require("express");
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
          res.status(500).json(err);
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
        res.status(500).json(err);
      });
  })
  .put(verifyRoles(roles_list.Admin, roles_list.Clerk), (req, res) => {
    let props = {
      _id: req.body._id,
      set: {
        primary_verification_status: false,
        officer_approval_status: false,
        manager_approval_status: false,
      },
    };
    admissionService
      .updateAdmissionStatus(props)
      .then((responses) => {
        res.status(200).json(responses);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

router
  .route("/officer-approval")
  .get(verifyRoles(roles_list.Admin, roles_list.Clerk), (req, res) => {
    admissionService
      .officerApprovalList()
      .then((responses) => {
        res.status(200).json(responses);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  })
  .put(verifyRoles(roles_list.Admin, roles_list.Clerk), (req, res) => {
    let props = {
      _id: req.body._id,
      set: {
        primary_verification_status: true,
        officer_approval_status: true,
        manager_approval_status: false,
      },
    };
    admissionService
      .updateAdmissionStatus(props)
      .then((responses) => {
        res.status(200).json(responses);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

router
  .route("/manager-approval")
  .get(verifyRoles(roles_list.Admin, roles_list.Manager), (req, res) => {
    admissionService
      .managerApprovalList()
      .then((responses) => {
        res.status(200).json(responses);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  })
  .put(verifyRoles(roles_list.Admin, roles_list.Manager), (req, res) => {
    let props = {
      _id: req.body._id,
      set: {
        primary_verification_status: true,
        officer_approval_status: true,
        manager_approval_status: true,
      },
    };
    Promise.all([
      admissionService.addStudent(props._id),
      admissionService.updateAdmissionStatus(props),
    ])
      .then((responses) => {
        res.status(200).json(responses);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

router
  .route("/admitted-students")
  .get(
    verifyRoles(roles_list.Admin, roles_list.Clerk, roles_list.Manager),
    (req, res) => {
      admissionService
        .admittedStudentList()
        .then((responses) => {
          res.status(200).json(responses);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    }
  );

module.exports = router;
