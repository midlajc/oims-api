const db = require('../config/db/db')
const collections = require('../config/collections/collections')
const views = require('../config/collections/views')

module.exports = {
    addApplicant:(applicant)=>{
        return db.get().collection(collections.APPLICANT_COLLECTION).insertOne(applicant)
    }
}