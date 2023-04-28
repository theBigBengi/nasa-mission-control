# NASA Mission Control Project

The NASA Mission Control App is a web application for tracking NASA's space launchesץ
This project is done for educational purposes.
you can visit the deployed version of the app at [NASA Mission Control](http://13.48.129.252:8000/launch).

## Getting Started

1. Ensure you have Node.js installed.
2. Create a free [Mongo Atlas](https://www.mongodb.com/atlas/database) database online or start a local MongoDB database.
3. Create a `server/.env` file with a `MONGO_URL` property set to your MongoDB connection string.
4. In the terminal, run: `npm install`

## Running the Project

1. In the terminal, run: `npm run deploy`
2. Browse to the mission control frontend at [localhost:8000](http://localhost:8000) and schedule an interstellar launch!

## Docker

1. Ensure you have the latest version of Docker installed
2. Run `docker build -t nasa-project .`
3. Run `docker run -it -p 8000:8000 nasa-project`

## Running the Tests

To run any automated tests, run `npm test`. This will:

- Run all the client-side tests: `npm test --prefix client`
- Run all the server-side tests: `npm test --prefix server`

## Acknowledgments

This app was developed alongside the [Complete Node.js Developer: Zero to Mastery](https://academy.zerotomastery.io/p/learn-node-js?affcode=441520_1jw4f2ay) course on Udemy.
