const accountModel = require("../model/accountsModel");

module.exports = {
  transactions: () => {
    return new Promise((resolve, reject) => {
      accountModel
        .fetchTransactions()
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
