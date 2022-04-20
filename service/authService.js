const jwt = require("jsonwebtoken");
const authModel = require("../model/authModel");

// const generateAccessToken = (user) => { return jwt.sign(user, user.accessSecretToken, { expiresIn: "30s" }); }
// const generateAccessToken = (user) => { return jwt.sign(user, user.accessSecretToken, { expiresIn: "86400s" }); }
const generateAccessToken = (user) => {
  return jwt.sign(user, user.accessSecretToken, { expiresIn: "1000086400s" });
};

module.exports = {
  //Generating New Access Token
  generateAccessToken: (user) => {
    const token = generateAccessToken(user);
    return new Promise((resolve, reject) => {
      authModel.generateLoginLog({
        userId: user._id,
        accessToken: token,
      });
      resolve(token);
    });
  },
  generateRefreshToken: (user) => {
    const token = jwt.sign(user, user.refreshSecretToken);
    authModel.postRefreshToken({
      refreshToken: token,
      userId: user._id,
    });
    return token;
  },
  generateSecretToken: () => {
    return require("crypto").randomBytes(64).toString("hex");
  },
  verifyToken: (req, res, next) => {
    const accessHeader = req.headers["authorization"];
    const token = accessHeader && accessHeader.split(" ")[1];
    if (token == null) res.status(401).json({ status: "Access Token is Null" });
    jwt.verify(token, req.user.accessSecretToken, (err, user) => {
      if (err) return res.status(403).json({ status: "Token Expired" });
      next();
    });
  },
  verifyRefreshToken: (req, res, next) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken == null)
      res.status(401).json({ status: "Refresh Token is Null" });
    jwt.verify(refreshToken, req.user.refreshSecretToken, (err, user) => {
      if (err) return res.status(403).json({ status: "Token Expired" });
      next();
    });
  },
  reGenerateAccessToken: (req, res, next) => {
    authModel
      .checkRefreshToken({
        userId: req.user._id,
        refreshToken: req.body.refreshToken,
      })
      .then((response) => {
        jwt.verify(
          req.body.refreshToken,
          req.user.refreshSecretToken,
          (err, user) => {
            if (err) return res.status(403).json({ status: "Access Denied" });
            const accessToken = generateAccessToken(req.user);
            next(accessToken);
          }
        );
      })
      .catch((response) => {
        res.status(401).json({ message: response });
      });
  },
  verifyUser: (req, res, next) => {
    authModel
      .checkPassword(req.body)
      .then((response) => {
        next();
      })
      .catch((response) => {
        res.status(403).json({ message: "Password Mismatches" });
      });
  },
  deleteRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      authModel.deleteRefreshToken(refreshToken).then(() => {
        resolve();
      });
    });
  },
  verifyRoles: (...allowedRoles) => {
    return (req, res, next) => {
      if (!req?.user.roles) return res.sendStatus(401);
      console.log(req.user.roles);
      const rolesArray = [...allowedRoles];
      console.log(rolesArray);
      const result = req.user.roles
        .map((role) => rolesArray.includes(role))
        .find((val) => val === true);
      if (!result) return res.sendStatus(401);
      next();
    };
  },
};
