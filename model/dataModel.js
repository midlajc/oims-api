const db = require("../config/db/db");
const collections = require("../config/collections/collections");
const views = require("../config/collections/views");
const { ObjectId } = require("mongodb");

module.exports = {
  getBoardOfStudies: () => {
    return db.get().collection(collections.BOARD_OF_STUDIES).find().toArray();
  },
  getStandards: (_id) => {
    return db
      .get()
      .collection(collections.STANDARDS)
      .find({ board_id: ObjectId(_id) })
      .toArray();
  },
  getGenders: () => {
    return db.get().collection(collections.GENDER_COLLECTION).find().toArray();
  },
  getStudentTypes:()=>{
      return db.get().collection(collections.STUDENT_TYPE_COLLECTION).find().toArray()
  }
};
