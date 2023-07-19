require("dotenv").config();
const mongoose = require("mongoose");
const { log } = require("mercedlogger");
const { DATABASE_URL } = process.env;

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .on("open", () => log.green("STAV DATABÁZY", "Úspešne pripojené!"))
  .on("close", () => log.orange("STAV DATABÁZY", "Neúspešné pripojenie!"))
  .on("error", (error) => log.red("STAV DATABÁZY", error));

module.exports = mongoose;
