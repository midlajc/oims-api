const sponsorshipModel = require("../model/sponsorshipsModel");
const { Sponsorship } = require("./schema/SponsorshipSchema");

module.exports = {
  newSponsorship: (data) => {
    return new Promise((resolve, reject) => {
      sponsorshipModel
        .addNewSponsorship(new Sponsorship(data))
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  sponsorshipList: () => {
    return new Promise((resolve, reject) => {
      sponsorshipModel
        .getSponsorshipList()
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
