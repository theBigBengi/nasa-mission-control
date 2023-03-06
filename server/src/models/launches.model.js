const launches = new Map();

let lastFlightNumber = 100;

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launche) {
  lastFlightNumber++;
  const newLaunch = Object.assign(launche, {
    flightNumber: lastFlightNumber,
    launchesDate: new Date(launche.launchesDate),
    upcoming: true,
    success: true,
    customers: ["dor"],
  });
  launches.set(lastFlightNumber, newLaunch);
}

function launchIsExist(launcheId) {
  return launches.has(launcheId);
}

function abortLaunch(launcheId) {
  const aborted = launches.get(launcheId);
  aborted.upcoming = false;
  aborted.success = false;

  return aborted;
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  abortLaunch,
  launchIsExist,
};
