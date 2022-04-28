const { ObjectId } = require("mongodb");

module.exports = {
  SponsorApplication: function (data) {
    this.name = data.name;
    this.dob = new Date(data.dob);
    this.gender_id = ObjectId(data.gender);
    this.mobile = data.mobile;
    this.email = data.email;
    this.permanent_address = data.permanentAddress;
    this.communication_address = data.communicationAddress;
    this.application_status = false;
    this.created_at = new Date();
  },
};
