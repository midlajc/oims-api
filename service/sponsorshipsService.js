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

  //to fetch all sponsorship list
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

  //to fetch individual sponsorship list
  sponsorshipListBySponsorId: (sponsor_id) => {
    return new Promise((resolve, reject) => {
      sponsorshipModel
        .getSponsorshipListBySponsorId(sponsor_id)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
