const db = require("../config/db/db");
const collections = require("../config/collections/collections");
const views = require("../config/collections/views");
const { ObjectId } = require("mongodb");

module.exports = {
  fetchTransactions: () => {
    return db
      .get()
      .collection(views.PAYMENT_VIEW)
      .find()
      .project({
        student_name: "$student.name",
        student_standard:'$student.standard.name',
        sponsor_name:'$sponsor.user.name',
        sponsor_mobile:'$sponsor.mobile',
        created_at: 1,
        amount: 1,
        sponsorship_no:"$sponsorship.sponsorship_no"
      })
      .sort({
          created_at:-1
      })
      .toArray();
  },
};
