const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connection.once("open", () => console.log("Connected to DB"));
mongoose.connection.on("error", (error) => console.log(error));

async function mongoConnect() {
  await mongoose.connect(process.env.MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
