const { ObjectId } = require("mongodb");
const { generateSecretToken, hashPassword } = require("../authService");

module.exports = {
  SponsorLogin: function (data) {
    this.name = data.name;
    this.username = data.mobile;
    this.password = data.password;
    this.accessSecretToken = generateSecretToken();
    this.refreshSecretToken = generateSecretToken();
    this.roleId = ObjectId("62653e547062b04282b0c021");
  },
  Sponsor: function (data) {
    this.user_id = data.user_id;
    this.dob = new Date(data.dob);
    this.gender_id = ObjectId(data.gender);
    this.mobile = data.mobile;
    this.email = data.email;
    this.permanent_address = data.permanent_address;
    this.communication_address = data.permanent_address;
    this.created_at = new Date();
  },
};
