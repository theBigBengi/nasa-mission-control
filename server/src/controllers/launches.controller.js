const {
  getAllLaunches,
  addNewLaunch,
  launchIsExist,
  abortLaunch,
} = require("../models/launches.model");
const { getPagination } = require("../services/query");

async function httpGetAllLaunches(req, res) {
  const { skip, limit } = getPagination(req.query);
  const launches = await getAllLaunches(skip, limit);
  return res.status(200).json(launches);
}

async function httpAddNewLunche(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }

  await addNewLaunch(launch);

  return res.status(201).json(launch);
}

async function httpDeleteLaunch(req, res) {
  const launchId = Number(req.params.id);

  if (!launchId) return res.status(400).json({ error: "Missing launch id" });

  const launch = await launchIsExist(launchId);

  if (!launch) return res.status(404).json({ error: "Launch do'es not exist" });

  const aborted = await abortLaunch(launchId);
  return res.status(200).json({ aborted });
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLunche,
  httpDeleteLaunch,
};
