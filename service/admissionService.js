const admissionModel = require("../model/admissionModel");
const { Applicant } = require("./Json_Format/AddApplicant");

module.exports = {
  addApplicant: (data) => {
    const applicant = new Applicant(data);
    return new Promise((resolve, reject) => {
      admissionModel.addApplicant(applicant).then(response=>{
          resolve(response);
      })
    });
  },
};
