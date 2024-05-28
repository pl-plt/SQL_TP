const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        subscribeDate: {
            type: Date,
            required: true,
            default: Date.now
        }
    }
)

module.exports = mongoose.model('User', userSchema)