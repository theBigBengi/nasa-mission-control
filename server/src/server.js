const http = require("http");
require("dotenv").config();
const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");
const { loadLaunchesData } = require("./models/launches.model");
const { mongoConnect } = require("./services/db");

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

async function runServer() {
  await mongoConnect();
  await loadPlanetsData();
  await loadLaunchesData();

  server.listen(PORT, () => console.log(`server running on port ${PORT}`));
}

runServer().catch((err) => console.log(err));
//
