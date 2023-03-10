const {
  getAllLaunches,
  addNewLaunch,
  launchIsExist,
  abortLaunch,
} = require("../models/launches.model");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

async function httpAddNewLunche(req, res) {
  const launch = req.body;
  const { target, launchDate, rocket, mission } = launch;

  if (!target || !launchDate || !rocket || !mission) {
    return res.status(400).json({
      error: "Missing launch property",
    });
  }

  if (isNaN(new Date(launchDate))) {
    return res.status(400).json({
      error: "Date is invalid format",
    });
  }

  addNewLaunch(launch);

  return res.status(201).json(launch);
}

async function httpDeleteLaunch(req, res) {
  const launchId = Number(req.params.id);

  if (!launchId) return res.status(400).json({ error: "Missing launch id" });

  if (!launchIsExist(launchId))
    return res.status(404).json({ error: "Launch do'es not exist" });

  const abortedLaunch = await abortLaunch(launchId);
  return res.status(200).json(abortedLaunch);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLunche,
  httpDeleteLaunch,
};
