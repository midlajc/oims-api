const express = require("express");
const path = require("path");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const db = require("./config/db/db");
const appService = require("./service/appService");
const cors = require("cors");

const app = express();

app.use(cors());

let getUser = (req, res, next) => {
  appService
    .getUser(req.headers["username"])
    .then((user) => {
      user.roles = Object.values(user.roles);
      req.user = user;
      next();
    })
    .catch((err) => {
      res.status(401).json(err);
    });
};

db.connect((err) => {
  if (err) console.log("DataBase Connection Error " + err);
  else {
    console.log("DataBase Connected");
    require("./config/db/dbAutoConf").init();
  }
});

const rootRouter = require("./route");
const authRouter = require("./routes/auth");

const authService = require("./service/authService");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", getUser, authRouter);
app.use("/", getUser, authService.verifyToken, rootRouter);

module.exports = app;
