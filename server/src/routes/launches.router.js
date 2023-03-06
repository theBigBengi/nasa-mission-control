const express = require("express");
const {
  httpGetAllLaunches,
  httpAddNewLunche,
  httpDeleteLaunch,
} = require("../controllers/launches.controller");

const router = express.Router();

router.route("/").get(httpGetAllLaunches).post(httpAddNewLunche);
router.route("/:id").delete(httpDeleteLaunch);

module.exports = router;
