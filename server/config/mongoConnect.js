const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/react-todo-app")
.then(() => {
    console.log("Pripojenie k MongoDB bolo úspešné!");
})
.catch((error) => {
    console.log("Pripojenie k MongoDB bolo neúspešné:", error);
})

module.exports = mongoose