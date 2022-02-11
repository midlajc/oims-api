const jwt = require('jsonwebtoken');
const authModel = require('../model/authModel');


const generateAccessToken = (user) => { return jwt.sign(user, user.accessSecretToken, { expiresIn: "86400s" }); }

module.exports = {
    //Generating New Access Token
    generateAccessToken: (user) => {
        const token = generateAccessToken(user);
        return new Promise((resolve, reject) => {
            authModel.generateLoginLog({
                user_id: user._id,
                accessToken: token
            })
            resolve(token);
        })
    },
    generateRefreshToken: (user) => {
        const token = jwt.sign(user, user.refreshSecretToken)
        authModel.postRefreshToken({
            refreshToken: token,
            user_id: user._id
        })
        return token;
    },
    generateSecretToken: () => {
        return require('crypto').randomBytes(64).toString('hex');
    },
    verifyToken: (req, res, next) => {
        const accessHeader = req.headers['authorization']
        const token = accessHeader && accessHeader.split(' ')[1]
        if (token == null) res.status(401).json({ "status": "Access Token is Null" })
        jwt.verify(token, req.user.accessSecretToken, (err, user) => {
            if (err) return res.status(403).json({ "status": "Access Denied" })
            next()
        });
    },
    verifyRefreshToken: (req, res, next) => {
        const refreshToken = req.body.refreshToken;
        // console.log(req.user);
        if (refreshToken == null) res.status(401).json({ "status": "Refresh Token is Null" })
        jwt.verify(refreshToken, req.user.refreshSecretToken, (err, user) => {
            if (err) return res.status(403).json({ "status": "Access Denied" })
            next()
        });
    },
    reGenerateAccessToken: (req,res,next) => {
        authModel.checkRefreshToken({
            user_id:req.user._id,
            refreshToken:req.body.refreshToken
        }).then(response=>{
            jwt.verify(req.body.refreshToken, req.user.refreshSecretToken, (err, user) => {
                if (err) return res.status(403).json({"message":"access denied"})
                const accessToken=generateAccessToken(req.user);
                next(accessToken);
            })
        }).catch(response=>{
            res.status(401).json({message:response})
        })
    },
    verifyUser:(req,res,next)=>{
        authModel.checkPassword(req.body).then(response=>{
            next()
        }).catch(response=>{
            res.status(403).json("password mismatches")
        })
    },
    deleteRefreshToken:(refreshToken)=>{
        return new Promise((resolve,reject)=>{
            authModel.deleteRefreshToken(refreshToken).then(()=>{
                resolve()
            })
        })
    }
}