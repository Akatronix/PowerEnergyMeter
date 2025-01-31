const mongoose = require("mongoose");

const socketSchema = mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now, // Automatically set the current timestamp
    required: true,
  },
  current: {
    type: String,
    required: true,
    min: 0,
  },
  voltage: {
    type: String,
    required: true,
    min: 0,
  },
  power: {
    type: String,
    required: true,
    min: 0,
  },
  energy: {
    type: String,
    required: true,
    min: 0,
  },
});

const controls = mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now, // Automatically set the current timestamp
    required: true,
  },
  socketName: {
    type: String,
    required: true,
    min: 0,
  },
  socketData: {
    type: String,
    required: true,
    min: 0,
  },
});

const timer = mongoose.Schema({
  socketName: {
    type: String,
    required: true,
    min: 0,
  },
  time: {
    type: String,
    required: true,
    min: 0,
  },
  action: {
    type: String,
    required: true,
    min: 0,
  },
});
const info = mongoose.Schema({
  socketone: {
    type: String,
    required: true,
    min: 0,
  },
  sockettwo: {
    type: String,
    required: true,
    min: 0,
  },
  socketthree: {
    type: String,
    required: true,
    min: 0,
  },
  socketfour: {
    type: String,
    required: true,
    min: 0,
  },
  socketfive: {
    type: String,
    required: true,
    min: 0,
  },
});
const total = mongoose.Schema({
  totalEnergy: {
    type: String,
    required: true,
    min: 0,
  },
});

const SocketModel = mongoose.model("socket", socketSchema);
const ControlModel = mongoose.model("control", controls);
const TimerModel = mongoose.model("timer", timer);
const InfoModel = mongoose.model("info", info);
const EnergyModel = mongoose.model("total energy", total);

module.exports = {
  SocketModel,
  ControlModel,
  TimerModel,
  InfoModel,
  EnergyModel,
};
