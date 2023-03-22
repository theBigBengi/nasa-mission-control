const Launch = require("./launches.mongo");
const Planet = require("./planets.mongo");
const launches = new Map();

const DEFAULT_FLIGHT_NUMBER = 1000;

async function getAllLaunches() {
  try {
    return await Launch.find({}, { __v: 0 });
  } catch (err) {}
}

async function addNewLaunch(launche) {
  let lastFlightNumber = (await getLastFlightNumber()) + 1;

  // Save launch on DB
  await createLaunch(
    Object.assign(launche, {
      flightNumber: lastFlightNumber,
      launchDate: new Date(launche.launchDate),
      upcoming: true,
      success: true,
      customers: ["dor"],
    })
  );
}

//
async function launchIsExist(launchId) {
  return await Launch.findOne({ flightNumber: launchId });
}

// Get the last flight number
async function getLastFlightNumber() {
  const flight = await Launch.findOneAndUpdate().sort("-flightNumber");

  // If there is no flights
  if (!flight) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return flight.flightNumber;
}

async function abortLaunch(launcheId) {
  const aborted = await Launch.updateOne(
    {
      flightNumber: launcheId,
    },
    {
      upcoming: false,
      success: false,
    }
  );

  return aborted.modifiedCount === 1;
}

async function createLaunch(launch) {
  try {
    const planet = await Planet.findOne({ keplerName: launch.target });

    if (!planet)
      throw new Error(`There is no planet with the name ${launch.target}`);

    const newLaunch = await Launch.updateOne(
      { flightNumber: launch.flightNumber },
      launch,
      { upsert: true }
    );

    // console.log(newLaunch);
    return newLaunch;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  abortLaunch,
  launchIsExist,
  getLastFlightNumber,
};
