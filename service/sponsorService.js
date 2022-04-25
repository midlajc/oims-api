const sponsorModel = require("../model/sponsorModel");

module.exports = {
  sponsorApplications: () => {
    return new Promise((resolve, reject) => {
      sponsorModel
        .getSponsorApplications()
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
