const db = require('../config/db/db')
const collections = require('../config/collections/collections')
const views = require('../config/collections/views')
const dbTrigger = require('../config/db/dbTriggers')

module.exports = {
    getUser: (username) => {
        return new Promise((resolve, reject) => {
            db.get().collection(views.USER_VIEW).findOne({ username: username })
                .then(response => {
                    if (response == null) reject({ message: "User not Found" })
                    resolve(response)
                })
        })
    }
}