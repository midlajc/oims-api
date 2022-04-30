const db = require("../config/db/db");
const collections = require("../config/collections/collections");
const views = require("../config/collections/views");
const { ObjectId } = require("mongodb");

module.exports = {
  getStudentList: () => {
    return db
      .get()
      .collection(views.STUDENT_VIEW)
      .find()
      .project({
        name: 1,
        dob: 1,
        gender: "$gender.name",
        standard: "$standard.name",
        board_of_studies: "$board_of_studies.name",
        student_type: "$student_type.name",
      })
      .toArray();
  },
};
