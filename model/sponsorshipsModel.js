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
  getSponsorShipList: () => {
    return db.get().collection(views.SPONSORSHIP_VIEW).find().toArray();
  },
};
