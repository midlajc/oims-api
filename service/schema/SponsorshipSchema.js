const { ObjectId } = require("mongodb");

module.exports = {
  Sponsorship: function (data) {
    this.sponsorship_no = parseInt(data.sponsorshipNo);
    this.student_id = ObjectId(data.studentId);
    this.sponsor_id = ObjectId(data.sponsorId);
    this.sponsorship_amount = parseInt(data.amount);
    this.payment_interval = data.paymentInterval;
    this.created_at = new Date();
    this.last_update_date = new Date();
    this.sponsorship_status = true;
    this.previous_dues = [];
  },
};
