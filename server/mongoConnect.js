const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/react-todo-app")
.then(() => {
    console.log("Připojení k MongoDB bylo úspěšné!");
})
.catch((error) => {
    console.log("Připojení k MongoDB bylo neúspěšné:", error);
})

const newSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
})

const collection = mongoose.model("collection", newSchema)

module.exports = collection