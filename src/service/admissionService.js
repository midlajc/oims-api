const admissionModel = require("../model/admissionModel");
const {
  Applicant,
  ApplicantParentDetails,
  ApplicantOtherDetails,
  AdmissionStatus,
  Student,
  StudentParentDetails,
  StudentOtherDetails,
} = require("./schema/AdmissionSchema");

module.exports = {
  addApplicant: (data) => {
    const applicant = new Applicant(data);
    return new Promise((resolve, reject) => {
      admissionModel.addApplicant(applicant).then((response) => {
        data.applicant_id = response.insertedId;
        Promise.all([
          admissionModel.addParentDetails(new ApplicantParentDetails(data)),
          admissionModel.addOtherDetails(new ApplicantOtherDetails(data)),
          admissionModel.addAdmissionStatus(new AdmissionStatus(data)),
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
  primaryVerificationList: () => {
    return new Promise((resolve, reject) => {
      admissionModel
        .getPrimaryVerificationList()
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  officerApprovalList: () => {
    return new Promise((resolve, reject) => {
      admissionModel
        .getOfficerApprovalList()
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  managerApprovalList: () => {
    return new Promise((resolve, reject) => {
      admissionModel
        .getManagerApprovalList()
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  updateAdmissionStatus: (props) => {
    return new Promise((resolve, reject) => {
      admissionModel
        .updateAdmissionStatus(props)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addStudent: (applicant_id) => {
    return new Promise((resolve, reject) => {
      Promise.all([
        admissionModel.getApplicantDetails(applicant_id),
        admissionModel.getApplicantParentDetails(applicant_id),
        admissionModel.getApplicantOtherDetails(applicant_id),
      ])
        .then(([student, studentParent, studentOther]) => {
          admissionModel.addStudent(new Student(student)).then((response) => {
            studentParent.student_id = response.insertedId;
            studentOther.student_id = response.insertedId;
            Promise.all([
              admissionModel.addStudentParentDetails(
                new StudentParentDetails(studentParent)
              ),
              admissionModel.addStudentOtherDetails(
                new StudentOtherDetails(studentOther)
              ),
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
  admittedStudentList: () => {
    return new Promise((resolve, reject) => {
      admissionModel
        .getAdmittedStudentList()
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
