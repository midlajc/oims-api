const db = require("../config/db/db");
const collections = require("../config/collections/collections");
const views = require("../config/collections/views");
const { ObjectId } = require("mongodb");

module.exports = {
  addNewSponsorship: (data) => {
    return db
      .get()
      .collection(collections.SPONSORSHIP_COLLECTION)
      .insertOne(data);
  },
  getSponsorshipList: () => {
    return db
      .get()
      .collection(views.SPONSORSHIP_VIEW)
      .find()
      .project({
        sponsorship_no: 1,
        student_name: "$student.name",
        student_gender: "$gender.name",
        student_dob: "$student.dob",
        student_mother_name: "$student.student_parent_details.mother_name",
        student_standard: "$student.standard.name",
        sponsor_name: "$sponsor.user.name",
        sponsor_email: "$sponsor.email",
        sponsor_mobile: "$sponsor.mobile",
        payment_interval: 1,
        sponsorship_amount: 1,
      })
      .toArray();
  },
  getSponsorshipListBySponsorId: (sponsor_id) => {
    return db
      .get()
      .collection(views.SPONSORSHIP_VIEW)
      .find({
        sponsor_id: ObjectId(sponsor_id),
      })
      .project({
        sponsorship_no: 1,
        student_name: "$student.name",
        student_gender: "$gender.name",
        student_dob: "$student.dob",
        student_mother_name: "$student.student_parent_details.mother_name",
        student_standard: "$student.standard.name",
        sponsor_name: "$sponsor.user.name",
        sponsor_email: "$sponsor.email",
        sponsor_mobile: "$sponsor.mobile",
        payment_interval: 1,
        sponsorship_amount: 1,
      })
      .toArray();
  },
};
