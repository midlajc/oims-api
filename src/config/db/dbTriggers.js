//to do trigger and auto functionality in mongodb

const db = require('./db')
const collections = require('../collections/collections')

module.exports={
    generateNewId:(collectionName)=>{
        return new Promise(async(resolve, reject) => {
            let doc = await db.get().collection(collections.ID_HANDLER).findOneAndUpdate({ collection_name:collectionName }, { "$inc": { latest_id: 1 } })
            resolve(doc.value.latest_id)
        })
    }
}