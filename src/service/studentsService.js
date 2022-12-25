const studentsModel = require("../model/studentsModel");

module.exports = {
  studentList: () => {
    return new Promise((resolve, reject) => {
      studentsModel
        .getStudentList()
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
