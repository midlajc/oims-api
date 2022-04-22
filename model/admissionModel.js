const db = require("../config/db/db");
const collections = require("../config/collections/collections");
const views = require("../config/collections/views");

module.exports = {
  addApplicant: (applicant) => {
    return db
      .get()
      .collection(collections.APPLICANT_COLLECTION)
      .insertOne(applicant);
  },
  addParentDetails: (parentDetails) => {
    return db
      .get()
      .collection(collections.APPLICANT_PARENT_COLLECTION)
      .insertOne(parentDetails);
  },
  addOtherDetails: (otherDetails) => {
    return db
      .get()
      .collection(collections.APPLICANT_DETAILS_COLLECTION)
      .insertOne(otherDetails);
  },
  addAdmissionStatus: (admissionStatus) => {
    return db
      .get()
      .collection(collections.ADMISSION_STATUS_COLLECTION)
      .insertOne(admissionStatus);
  },
  getApplicantList: () => {
    return db
      .get()
      .collection(views.APPLICANT_VIEW)
      .find()
      .project({
        _id: 1,
        name: 1,
        dob: 1,
        gender: "$gender.name",
        board_of_studies: "$board_of_studies.name",
        standard: "$standard.name",
        student_type: "$student_type.name",
      })
      .toArray();
  },
  getPrimaryVerificationList: () => {
    return db
      .get()
      .collection(views.APPLICANT_VIEW)
      .find({
        "admission_status.primary_verification_status": false,
        "admission_status.officer_approval_status": false,
        "admission_status.manager_approval_status": false,
      })
      .project({
        _id: 1,
        name: 1,
        dob: 1,
        gender: "$gender.name",
        board_of_studies: "$board_of_studies.name",
        standard: "$standard.name",
        student_type: "$student_type.name",
      })
      .toArray();
  },
  getOfficerApprovalList: () => {
    return db
      .get()
      .collection(views.APPLICANT_VIEW)
      .find({
        "admission_status.primary_verification_status": true,
        "admission_status.officer_approval_status": false,
        "admission_status.manager_approval_status": false,
      })
      .project({
        _id: 1,
        name: 1,
        dob: 1,
        gender: "$gender.name",
        board_of_studies: "$board_of_studies.name",
        standard: "$standard.name",
        student_type: "$student_type.name",
      })
      .toArray();
  },
  getManagerApprovalList: () => {
    return db
      .get()
      .collection(views.APPLICANT_VIEW)
      .find({
        "admission_status.primary_verification_status": true,
        "admission_status.officer_approval_status": true,
        "admission_status.manager_approval_status": false,
      })
      .project({
        _id: 1,
        name: 1,
        dob: 1,
        gender: "$gender.name",
        board_of_studies: "$board_of_studies.name",
        standard: "$standard.name",
        student_type: "$student_type.name",
      })
      .toArray();
  },
};
