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
      })
      .toArray();
  },
};
