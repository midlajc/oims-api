const sponsorModel = require("../model/sponsorModel");
const { hashPassword } = require("./authService");
const {
  SponsorLogin,
  Sponsor,
  PaymentLog,
  Payment,
} = require("./schema/SponsorSchema");
const Razorpay = require("razorpay");
const sponsorshipsService = require("./sponsorshipsService");
const crypto = require("crypto");
const { ObjectId } = require("mongodb");

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
  verifyPayment: (data) => {
    return new Promise(async (resolve, reject) => {
      const {
        receiptId,
        orderCreationId,
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature,
        sponsorId,
      } = data;

      // Creating our own digest
      // The format should be like this:
      // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
      const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);

      shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

      const digest = shasum.digest("hex");

      // comparing our digest with the actual signature
      if (digest !== razorpaySignature) {
        reject("Transaction not legit!");
      } else {
        const props = {
          find: {
            _id: receiptId,
          },
          update: {
            $set: {
              razorpay_payment_id: razorpayPaymentId,
              razorpay_order_id: razorpayOrderId,
              razorpay_signature: razorpaySignature,
              payment_status: true,
            },
          },
        };
        sponsorModel
          .updatePaymentLog(props)
          .then(async (response) => {
            let sponsorships = await sponsorModel.fetchSponsorshipsDues(
              sponsorId
            );
            let amount = parseInt(response.value.amount);

            let payments = [];

            for (x of sponsorships) {
              if (amount === 0) break;
              let pay = amount;
              if (amount > parseInt(x.total_to_pay))
                pay = parseInt(x.total_to_pay);
              amount -= pay;
              payments.push(
                new Payment({
                  receiptId,
                  sponsorshipId: x.sponsorship_id,
                  amount: pay,
                })
              );
            }
            sponsorModel
              .createNewPayment(payments)
              .then((response) => {
                resolve(response);
              })
              .catch((err) => {
                reject(err);
              });
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  },
  transactions: (sponsorId) => {
    return new Promise((resolve, reject) => {
      sponsorModel
        .getTransactions(sponsorId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
