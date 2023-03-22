const mongoose = require("mongoose");

const launchesSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  upcoming: {
    type: Boolean,
    default: true,
  },
  success: {
    type: Boolean,
    default: false,
  },
  customers: [String],
});

module.exports = mongoose.model("Launch", launchesSchema);
