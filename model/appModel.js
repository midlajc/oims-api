const db = require("../config/db/db");
const collections = require("../config/collections/collections");
const views = require("../config/collections/views");
const dbTrigger = require("../config/db/dbTriggers");
const { ObjectId } = require("mongodb");

module.exports = {
  getUser: (username) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(views.USER_VIEW)
        .findOne({ username: username })
        .then((response) => {
          if (response == null) reject({ message: "User not Found" });
          resolve(response);
        });
    });
  },
  getSponsorId: (userId) => {
    return db
      .get()
      .collection(collections.SPONSOR_COLLECTION)
      .findOne(
        { user_id: ObjectId(userId) },
        {
          projection: {
            _id: 1,
          },
        }
      );
  },
};
