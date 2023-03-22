import { AJAX } from "../helpers/ajax";

const API_URL = "http://localhost:5000";

async function httpGetPlanets() {
  try {
    const response = await fetch(`${API_URL}/api/v1/planets`);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

async function httpGetLaunches() {
  try {
    const launches = await AJAX(`${API_URL}/api/v1/launches`);
    return launches.sort((a, b) => a.flightNumber - b.flightNumber);
  } catch (err) {
    console.log(err);
  }
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    const response = await AJAX(`${API_URL}/api/v1/launches`, launch, false);

    return response;
  } catch (err) {
    return { ok: false };
  }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    const response = await fetch(`${API_URL}/api/v1/launches/${id}`, {
      method: "DELETE",
    });

    return response;
  } catch (err) {
    return { ok: false };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
