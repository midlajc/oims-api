const sponsorModel = require("../model/sponsorModel");
const { hashPassword } = require("./authService");
const { SponsorLogin, Sponsor, PaymentLog } = require("./schema/SponsorSchema");
const Razorpay = require("razorpay");

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
          resolve(dues);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  createRazorpayInstance: (data) => {
    return new Promise((resolve, reject) => {
      sponsorModel
        .generatePaymentLog(new PaymentLog(data))
        .then(async (response) => {
          try {
            const instance = new Razorpay({
              key_id: process.env.RAZORPAY_KEY_ID,
              key_secret: process.env.RAZORPAY_SECRET,
            });

            const options = {
              amount: parseInt(data.amount) * 100, // amount in smallest currency unit
              currency: "INR",
              receipt: "" + response.insertedId,
            };

            const payment = await instance.orders.create(options);

            if (!payment) {
              reject("Some error occurred");
            } else {
              resolve(payment);
            }
          } catch (err) {
            reject(err);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
