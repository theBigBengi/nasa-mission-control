const http = require("http");
const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

async function runServer() {
  await loadPlanetsData();
  await mongoose.connect(
    "mongodb+srv://bengiplayground:9Hfh7HbXad0iYQd4@cluster0.kwrwdfu.mongodb.net/nasa"
  );

  server.listen(PORT, () => console.log(`server running on port ${PORT}`));
}

mongoose.connection.once("open", () => console.log("Connected to DB"));
mongoose.connection.on("error", (error) => console.log(error));

runServer().catch((err) => console.log(err));
