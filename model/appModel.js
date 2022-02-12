const db=require('../config/db/db')
const collections=require('../config/collections/collections')
const dbTrigger=require('../config/db/dbTriggers')

module.exports={
    getUser:(username)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.USERS_COLLECTION).findOne({username:username})
            .then(response=>{
                if(response==null) reject("User not Found")
                resolve(response)
            })
        })
    }
}