const express = require("express");
const cors = require("cors");
const path = require("path");

const planetsRouter = require("../src/routes/plantes.router");
const launchesRouter = require("../src/routes/launches.router");

const app = express();

/**
 *  middleweares
 */
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

app.use(express.static(path.join(__dirname, "..", "public")));
/**
 *  routes
 */
app.use("/api/v1/planets", planetsRouter);
app.use("/api/v1/launches", launchesRouter);
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "public", "/index.html"));
});

module.exports = app;
