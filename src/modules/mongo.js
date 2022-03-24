const mongoose = require("mongoose")
const { MONGO_URL } = require("../../config")

require("../models/UsersModel")
require("../models/MessageModel")

module.exports = async function() {
    try {
        await mongoose.connect(MONGO_URL)
        console.log("MONGO CONNECT SUCCESFULL")
    } catch(e) {
        console.log("MONGO CONNECT FAILED")
    }
}