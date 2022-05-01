const appModel = require("../model/appModel");

module.exports = {
  getUser: (username) => {
    return new Promise((resolve, reject) => {
      appModel
        .getUser(username)
        .then((user) => {
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getSponsorId: (userId) => {
    return new Promise((resolve, reject) => {
      appModel
        .getSponsorId(userId)
        .then((response) => {
          resolve(response._id);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
