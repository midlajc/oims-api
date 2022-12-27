const db = require("../config/db/db");
const collections = require("../config/collections/collections");
const views = require("../config/collections/views");
const dbTrigger = require("../config/db/dbTriggers");
const bcrypt = require("bcryptjs");
const { ObjectId } = require("mongodb");

module.exports = {
  //to create a log to login log collection
  generateLoginLog: (data) => {
    return new Promise(async (resolve, reject) => {
      db.get()
        .collection(collections.LOGIN_LOG)
        .insertOne({
          // "_id": await dbTrigger.generateNewId(collections.LOGIN_LOG),
          userId: ObjectId(data.userId),
          accessToken: data.accessToken,
          time: Date.now(),
        });
      resolve();
    });
  },
  postRefreshToken: (data) => {
    return new Promise(async (resolve, reject) => {
      db.get()
        .collection(collections.REFRESH_TOKEN)
        .insertOne({
          // "id": await dbTrigger.generateNewId(collections.REFRESH_TOKEN),
          refreshToken: data.refreshToken,
          userId: ObjectId(data.userId),
          tokenStatus: true,
          created_at: new Date(),
        });
      resolve();
    });
  },
  checkRefreshToken: (data) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.REFRESH_TOKEN)
        .findOne({ refreshToken: data.refreshToken })
        .then((response) => {
          if (response == null) reject("Token not Found");
          if (response.tokenStatus == false) reject("Token Expired");
          if (response.userId.toString() != data.userId.toString())
            reject("Unauthorized Operation");
          resolve();
        });
    });
  },
  checkPassword: (data) => {
    return new Promise(async (resolve, reject) => {
      let user = await db
        .get()
        .collection(collections.USERS_COLLECTION)
        .findOne({ username: data.username });
      bcrypt.compare(data.password, user.password, (err, done) => {
        if (done) resolve();
        reject();
      });
    });
  },
  deleteRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.REFRESH_TOKEN)
        .updateOne(
          { refreshToken: refreshToken },
          {
            $set: {
              tokenStatus: false,
            },
          }
        );
      resolve();
    });
  },
};
