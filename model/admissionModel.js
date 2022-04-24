const db = require("../config/db/db");
const collections = require("../config/collections/collections");
const views = require("../config/collections/views");
const { ObjectId } = require("mongodb");

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
  updateAdmissionStatus: (props) => {
    return db
      .get()
      .collection(collections.ADMISSION_STATUS_COLLECTION)
      .updateOne(
        { applicant_id: ObjectId(props._id) },
        {
          $set: props.set,
        }
      );
  },
  getApplicantDetails: (_id) => {
    return db
      .get()
      .collection(collections.APPLICANT_COLLECTION)
      .findOne({
        _id: ObjectId(_id),
      });
  },
  getApplicantParentDetails: (_id) => {
    return db
      .get()
      .collection(collections.APPLICANT_PARENT_COLLECTION)
      .findOne({
        applicant_id: ObjectId(_id),
      });
  },
  getApplicantOtherDetails: (_id) => {
    return db
      .get()
      .collection(collections.APPLICANT_DETAILS_COLLECTION)
      .findOne({
        applicant_id: ObjectId(_id),
      });
  },
  addStudent: (data) => {
    return db.get().collection(collections.STUDENT_COLLECTION).insertOne(data);
  },
  addStudentParentDetails: (data) => {
    return db
      .get()
      .collection(collections.STUDENT_PARENT_COLLECTION)
      .insertOne(data);
  },
  addStudentOtherDetails: (data) => {
    return db
      .get()
      .collection(collections.STUDENT_DETAILS_COLLECTION)
      .insertOne(data);
  },
  getAdmittedStudentList: () => {
    return db
      .get()
      .collection(views.APPLICANT_VIEW)
      .find({
        "admission_status.primary_verification_status": true,
        "admission_status.officer_approval_status": true,
        "admission_status.manager_approval_status": true,
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
