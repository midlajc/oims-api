//app initial start auto db configuration file

const db = require('./db')
const collections = require('../collections/collections')

module.exports = {
    init: () => {
        userIdHandler();
        loginLogIdHandler();
        refreshTokenIdHandler();
    }
}

//to create users collection id handler
const userIdHandler = () => {
    db.get().collection(collections.ID_HANDLER).findOne({ collection_name: collections.USERS_COLLECTION }).then((response) => {
        if (response == null) {
            db.get().collection(collections.ID_HANDLER).insertOne({ collection_name: collections.USERS_COLLECTION, latest_id: 1 })
        }
    })
}

//to create login_log collection id handler
const loginLogIdHandler=()=>{
    db.get().collection(collections.ID_HANDLER).findOne({ collection_name: collections.LOGIN_LOG }).then((response) => {
        if (response == null) {
            db.get().collection(collections.ID_HANDLER).insertOne({ collection_name: collections.LOGIN_LOG, latest_id: 1 })
        }
    })
}

//to create refresh_token collection id handler
const refreshTokenIdHandler=()=>{
    db.get().collection(collections.ID_HANDLER).findOne({ collection_name: collections.REFRESH_TOKEN }).then((response) => {
        if (response == null) {
            db.get().collection(collections.ID_HANDLER).insertOne({ collection_name: collections.REFRESH_TOKEN, latest_id: 1 })
        }
    })
}