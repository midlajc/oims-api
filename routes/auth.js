var express = require('express');
var router = express.Router();
const authService = require('../service/authService');

/* auth service. */
router.post('/login', authService.verifyUser, async (req, res, next) => {
    let accessToken = await authService.generateAccessToken(req.user);
    let refreshToken = await authService.generateRefreshToken(req.user);
    res.status(200).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        username: req.user.username
    });
});

router.get('/token', authService.verifyRefreshToken, async (req, res) => {
    authService.reGenerateAccessToken(req, res, (accessToken) => {
        res.status(200).json({ accessToken: accessToken })
    });
});

router.post('/logout', authService.verifyRefreshToken, (req, res) => {
    authService.deleteRefreshToken(req.body.refreshToken).then(() => {
        res.status("200").json("logout success");
    });
});

module.exports = router;