const db = require('../config/db/db')
const collections = require('../config/collections/collections')
const dbTrigger = require('../config/db/dbTriggers')
const bcrypt=require('bcryptjs')

module.exports = {
    //to create a log to login log collection 
    generateLoginLog: (data) => {
        return new Promise(async (resolve, reject) => {
            db.get().collection(collections.LOGIN_LOG).insertOne({
                "id": await dbTrigger.generateNewId(collections.LOGIN_LOG),
                "user_id": data.user_id,
                "accessToken": data.accessToken,
                "time": Date.now()
            })
            resolve()
        })
    },
    postRefreshToken: (data) => {
        return new Promise(async (resolve, reject) => {
            db.get().collection(collections.REFRESH_TOKEN).insertOne({
                "id": await dbTrigger.generateNewId(collections.REFRESH_TOKEN),
                "refreshToken": data.refreshToken,
                "user_id": data.user_id,
                "tokenStatus": true
            })
            resolve()
        })
    },
    checkRefreshToken:(data)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.REFRESH_TOKEN).findOne({"refreshToken":data.refreshToken})
            .then(res=>{
                if(res==null) reject("token not found")
                if(res.tokenStatus==false) reject("token expired")
                if(res.user_id!=data.user_id) reject("unautherized operation")
                resolve();
            })
        })
    },
    checkPassword:(data)=>{
        return new Promise(async(resolve,reject)=>{
            let user=await db.get().collection(collections.USERS_COLLECTION).findOne({username:data.username});
            bcrypt.compare(data.password,user.password,(err,done)=>{
                if(done) resolve();
                reject();
            })
        })
    },
    deleteRefreshToken:(refreshToken)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.REFRESH_TOKEN).update({refreshToken:refreshToken},{
                "$set":{
                    tokenStatus:false
                }
            })
            resolve()
        })
    }
}