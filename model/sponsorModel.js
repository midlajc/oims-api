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
            dob: 1,
            gender: "$gender.name",
            username: "$user.username",
            mobile: 1,
            email: 1,
          },
        }
      );
  },
  getSponsorList: () => {
    return db
      .get()
      .collection(views.SPONSOR_VIEW)
      .find()
      .project({
        name: "$user.name",
        dob: 1,
        mobile: 1,
        email: 1,
        gender: "$gender.name",
      })
      .toArray();
  },
  fetchDues: (sponsor_id) => {
    return db
      .get()
      .collection(views.DUE_VIEW)
      .aggregate([
        {
          $match: {
            sponsor_id: ObjectId(sponsor_id),
          },
        },
        {
          $project: {
            sponsor_id: 1,
            total_to_pay: 1,
            current_to_pay: 1,
            previous_to_pay: 1,
          },
        },
        {
          $group: {
            _id: "$sponsor_id",
            sponsorship_wise: {
              $push: "$$ROOT",
            },
          },
        },
        {
          $set: {
            total_to_pay: {
              $sum: ["$sponsorship_wise.total_to_pay"],
            },
            current_to_pay: {
              $sum: ["$sponsorship_wise.current_to_pay"],
            },
            previous_to_pay: {
              $sum: ["$sponsorship_wise.previous_to_pay"],
            },
          },
        },
        {
          $project: {
            _id: 0,
            sponsor_id: "$_id",
            sponsorship_wise: 1,
            total_to_pay: 1,
            current_to_pay: 1,
            previous_to_pay: 1,
          },
        },
      ])
      .toArray();
  },
  generatePaymentLog: (data) => {
    return db.get().collection(collections.PAYMENT_LOG).insertOne(data);
  },
  updatePaymentLog: (props) => {
    return db
      .get()
      .collection(collections.PAYMENT_LOG)
      .findOneAndUpdate(
        {
          _id: ObjectId(props.find._id),
        },
        props.update
      );
  },
  createNewPayment: (data) => {
    return db.get().collection(collections.PAYMENT_COLLECTION).insertMany(data);
  },
  fetchSponsorshipsDues: (sponsorId) => {
    return db
      .get()
      .collection(views.DUE_VIEW)
      .find({
        sponsor_id: ObjectId(sponsorId),
      })
      .sort({
        total_to_pay: -1,
      })
      .project({
        _id: 0,
        sponsorship_id: "$_id",
        sponsor_id: 1,
        total_to_pay: 1,
        current_to_pay: 1,
        previous_to_pay: 1,
      })
      .toArray();
  },
  getTransactions: (sponsorId) => {
    return db
      .get()
      .collection(views.PAYMENT_VIEW)
      .find({ "sponsor._id": ObjectId(sponsorId) })
      .project({
        student_name: "$student.name",
        created_at: 1,
        amount: 1,
        receipt_id: 1,
      }).sort({
        created_at:-1
      })
      .toArray();
  },
};
