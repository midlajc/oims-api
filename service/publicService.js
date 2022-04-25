const { Sponsor } = require("./schema/PublicSchema");
const publicModel = require("../model/publicModel");

module.exports = {
  sponsorRegistration: (data) => {
    return new Promise((resolve, reject) => {
      publicModel
        .addSponsorRegistration(new Sponsor(data))
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
