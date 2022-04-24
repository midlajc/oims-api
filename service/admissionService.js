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
        data._id = response.insertedId;
        const parentDetails = new ApplicantParentDetails(data);
        const otherDetails = new ApplicantOtherDetails(data);
        const admissionStatus = new AdmissionStatus(data);
        Promise.all([
          admissionModel.addParentDetails(parentDetails),
          admissionModel.addOtherDetails(otherDetails),
          admissionModel.addAdmissionStatus(admissionStatus),
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
  addStudent: (_id) => {
    return new Promise((resolve, reject) => {
      Promise.all([
        admissionModel.getApplicantDetails(_id),
        admissionModel.getApplicantParentDetails(_id),
        admissionModel.getApplicantOtherDetails(_id),
      ])
        .then(([student, studentParent, studentOther]) => {
          Promise.all([
            admissionModel.addStudent(new Student(student)),
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
