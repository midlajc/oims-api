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
  userProfile: (user_id) => {
    return new Promise((resolve, reject) => {
      sponsorModel
        .getUserProfile(user_id)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  SponsorList: () => {
    return new Promise((resolve, reject) => {
      sponsorModel
        .getSponsorList()
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  calculateDue: (sponsor_id) => {
    return new Promise((resolve, reject) => {
      sponsorModel
        .fetchDues(sponsor_id)
        .then((dues) => {
          // let total = {
          //   total_to_pay: 0,
          //   current_to_pay: 0,
          //   previous_to_pay: 0,
          // };
          // await dues.map((value, index) => {
          //   total.total_to_pay += parseInt(dues.total_to_pay);
          //   total.current_to_pay += parseInt(dues.current_to_pay);
          //   total.previous_to_pay += parseInt(dues.previous_to_pay);
          // });
          // total.sponsorship_wise = dues;
          resolve(dues);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
