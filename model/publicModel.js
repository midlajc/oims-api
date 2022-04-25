const db = require("../config/db/db");
const collections = require("../config/collections/collections");
const views = require("../config/collections/views");
const { ObjectId } = require("mongodb");

module.exports={
    addSponsorRegistration:(data)=>{
        return db.get().collection(collections.SPONSOR_APPLICATION_COLLECTION).insertOne(data)
    }
}