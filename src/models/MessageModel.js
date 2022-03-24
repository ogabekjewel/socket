const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({
    id: {
        unique: true,
        required: true,
        type: String,
    },
    text: {
        type: String,
        required: true,
    },
    from_id: {
        type: String,
        required: true,
    },
    to_id: {
        type: String,
        required: true,       
    }
})

const messages = mongoose.model("message", MessageSchema)

module.exports = messages