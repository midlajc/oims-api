const db = require("../config/db/db");
const collections = require("../config/collections/collections");
const views = require("../config/collections/views");
const { ObjectId } = require("mongodb");

module.exports = {
  getSponsorApplications: () => {
    return db
      .get()
      .collection(views.SPONSOR_APPLICATION_VIEW)
      .find({
        application_status: false,
      })
      .project({
        application_status: 0,
        created_at: 0,
        gender_id: 0,
        permanent_address: 0,
        communication_address: 0,
      })
      .toArray();
  },
};
