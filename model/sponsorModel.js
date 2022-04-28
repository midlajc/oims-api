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
  getSponsorApplication: (application_id) => {
    return db
      .get()
      .collection(collections.SPONSOR_APPLICATION_COLLECTION)
      .findOne({ _id: ObjectId(application_id) });
  },
  createSponsorLogin: (data) => {
    return db.get().collection(collections.USERS_COLLECTION).insertOne(data);
  },
  addSponsor: (data) => {
    return db.get().collection(collections.SPONSOR_COLLECTION).insertOne(data);
  },
  updateSponsorApplicationStatus: (props) => {
    return db
      .get()
      .collection(collections.SPONSOR_APPLICATION_COLLECTION)
      .updateOne(
        {
          _id: ObjectId(props._id),
        },
        {
          $set: props.set,
        }
      );
  },
  getUserProfile: (user_id) => {
    return db
      .get()
      .collection(views.SPONSOR_VIEW)
      .findOne(
        {
          user_id: ObjectId(user_id),
        },
        {
          projection: {
            name: "$user.name",
            dob:1,
            gender:'$gender.name',
            username:'$user.username',
            mobile:1,
            email:1,
          },
        }
      );
  },
};
