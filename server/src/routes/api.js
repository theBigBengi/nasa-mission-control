const planetsRouter = require("./plantes.router");
const launchesRouter = require("./launches.router");
const express = require("express");

const api = express.Router();

api.use("/planets", planetsRouter);
api.use("/launches", launchesRouter);

module.exports = api;
