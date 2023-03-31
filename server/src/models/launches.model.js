const Launch = require("./launches.mongo");
const Planet = require("./planets.mongo");
const axios = require("axios");

// Load space X launches data
async function loadLaunchesData() {
  const url = "https://api.spacexdata.com/v4/launches/query";

  try {
    console.log("Fetching SPACE X data");

    const response = await axios.post(url, {
      query: {},
      options: {
        pagination: false,
        sort: { date_local: 1 },
        populate: [
          {
            path: "rocket",
            select: { name: 1 },
          },
          {
            path: "payloads",
            select: { customers: 1 },
          },
        ],
      },
    });

    if (response.status !== 200) {
      // TODO: throw error forowerd
      console.log("Problem fetching data fron SPACE X");
    }

    const docs = response.data.docs;

    const lastFlight = docs[docs.length - 1];

    const launch = await Launch.findOne(
      { flightNumber: lastFlight.flight_number },
      { __v: 0 }
    );

    if (launch) {
      return console.log("SPACE X data is already up to date");
    }

    for (const doc of docs) {
      const customers = doc["payloads"].flatMap((payload) => payload.customers);

      await saveLaunch({
        flightNumber: doc["flight_number"],
        launchDate: doc["date_local"],
        upcoming: doc["upcoming"],
        success: doc["success"],
        rocket: doc["rocket"]["name"],
        mission: doc["name"],
        customers,
      });
    }

    console.log("SPACE X data was updated successfuly");
  } catch (err) {
    console.log(err);
  }
}

async function getAllLaunches(skip, limit) {
  try {
    return await Launch.find({}, { __v: 0 })
      .sort({ flightNumber: 1 })
      .skip(skip)
      .limit(limit);
  } catch (err) {
    console.log(err);
  }
}

async function addNewLaunch(launche) {
  // Validate if the planet target is exist
  const planet = await Planet.findOne({ keplerName: launch.target });
  if (!planet)
    throw new Error(`There is no planet with the name ${launch.target}`);

  // Get the last flight number for genrating a new one
  let lastFlightNumber = (await getLastFlightNumber()) + 1;

  // Create laucnh
  const newLaunch = Object.assign(launche, {
    flightNumber: lastFlightNumber,
    launchDate: new Date(launche.launchDate),
    upcoming: true,
    success: true,
    customers: ["dor"],
  });
  // Save launch to DB
  await saveLaunch(newLaunch);
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
    return process.env.DEFAULT_FLIGHT_NUMBER;
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

async function saveLaunch(launch) {
  try {
    const newLaunch = await Launch.updateOne(
      { flightNumber: launch.flightNumber },
      launch,
      { upsert: true }
    );
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
  loadLaunchesData,
};
