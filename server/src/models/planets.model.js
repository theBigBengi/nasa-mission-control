const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");
const planetsMongo = require("./planets.mongo");

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    function isHabitablePlanet(planet) {
      return (
        planet["koi_disposition"] === "CONFIRMED" &&
        planet["koi_insol"] > 0.36 &&
        planet["koi_insol"] < 1.11 &&
        planet["koi_prad"] < 1.6
      );
    }

    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        if (isHabitablePlanet(data)) {
          createPlanet({ keplerName: data.kepler_name });
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", () => {
        resolve();
      });
  });
}

async function createPlanet(planet) {
  try {
    return await planetsMongo.updateOne(planet, planet, { upsert: true });
  } catch (err) {
    console.log(err);
  }
}

async function getAllPlanets() {
  try {
    return await planetsMongo.find({}, { __v: 0 });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
