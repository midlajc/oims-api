const mongoClient = require('mongodb').MongoClient

const state = {
    db: null
}

module.exports.connect = (done) => {
    const url = process.env.dbLink
    const dbName = process.env.dbName

    mongoClient.connect(url, { useUnifiedTopology: true }, (err, data) => {
        if (err) return done(err)
        state.db = data.db(dbName)
        done()
    })
}

module.exports.get = () => {
    return state.db
}