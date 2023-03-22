const mongoose = require("mongoose");

mongoose.connection.once("open", () => console.log("Connected to DB"));
mongoose.connection.on("error", (error) => console.log(error));

async function mongoConnect() {
  await mongoose.connect(
    "mongodb+srv://bengiplayground:9Hfh7HbXad0iYQd4@cluster0.kwrwdfu.mongodb.net/nasa"
  );
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
