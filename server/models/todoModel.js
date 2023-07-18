const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        unique: true,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    userId: {
        type: String,
        required: true,
      },
})

const todoModel = mongoose.model("todoModel", todoSchema)

module.exports = todoModel