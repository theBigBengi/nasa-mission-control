const express = require("express");
const cors = require("cors");
const path = require("path");
const api = require("../src/routes/api");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

app.use(express.static(path.join(__dirname, "..", "public")));

// API routes
app.use("/api/v1", api);

//
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "public", "/index.html"));
});

module.exports = app;
