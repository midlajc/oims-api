var express = require('express');
var router = express.Router();
const authService = require('../service/authService');

/* GET home page. */
router.post('/login', authService.verifyUser, async (req, res, next) => {
    let accessToken = await authService.generateAccessTocken(req.user);
    let refreshToken = await authService.generateRefreshToken(req.user);
    res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
});

router.get('/token', authService.verifyRefreshToken, async (req, res) => {
    authService.reGenerateAccessToken(req, res, (accessToken) => {
        res.status(200).json({ accessToken: accessToken })
    });
});

router.post('/logout', authService.verifyRefreshToken, (req, res) => {
    authService.deleteRefreshToken(req.body.refreshToken).then(() => {
        res.status("200").json({ "message": "logout success" });
    });
});

module.exports = router;