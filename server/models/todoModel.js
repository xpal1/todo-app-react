const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    deleted: {
        type: String,
        default: 'false'
    },
    userId: {
        type: String,
        required: true
    }
})

const todoModel = mongoose.model("todoModel", todoSchema)

module.exports = todoModel