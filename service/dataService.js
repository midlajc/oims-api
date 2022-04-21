const dataModal = require("../model/dataModel");

module.exports = {
  boardOfStudiesList: () => {
    return new Promise((resolve, reject) => {
      dataModal
        .getBoardOfStudies()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  standardsList: (_id) => {
    return new Promise((resolve, reject) => {
      dataModal
        .getStandards(_id)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
