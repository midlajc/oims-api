const admissionModel = require("../model/admissionModel");
const {
  Applicant,
  ParentDetails,
  OtherDetails,
} = require("./schema/AddApplicant");

module.exports = {
  addApplicant: (data) => {
    const applicant = new Applicant(data);
    return new Promise((resolve, reject) => {
      admissionModel.addApplicant(applicant).then((response) => {
        data._id = response.insertedId;
        const parentDetails = new ParentDetails(data);
        const otherDetails = new OtherDetails(data);
        Promise.all([
          admissionModel.addParentDetails(parentDetails),
          admissionModel.addOtherDetails(otherDetails),
        ])
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  },
  applicantList: () => {
    return new Promise((resolve, reject) => {
      admissionModel
        .getApplicantList()
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
