const { ObjectId } = require("mongodb");
const sponsorModel = require("../model/sponsorModel");
const { hashPassword } = require("./authService");
const { SponsorLogin, Sponsor } = require("./schema/SponsorSchema");

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
  approveSponsorApplication: (application_id) => {
    return new Promise((resolve, reject) => {
      sponsorModel
        .getSponsorApplication(application_id)
        .then(async (application) => {
          application.password = await hashPassword(application.email);
          sponsorModel
            .createSponsorLogin(new SponsorLogin(application))
            .then((response) => {
              application.user_id = response.insertedId;
              let props = {
                _id: application_id,
                set: {
                  application_status: true,
                },
              };
              console.log(props);
              Promise.all([
                sponsorModel.addSponsor(new Sponsor(application)),
                sponsorModel.updateSponsorApplicationStatus(props),
              ])
                .then((response) => {
                  resolve(response);
                })
                .catch((err) => {
                  reject(err);
                });
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
