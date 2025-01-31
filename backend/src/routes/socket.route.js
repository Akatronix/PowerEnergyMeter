const express = require("express");
const {
  getAllSocketData,
  updateSocketData,
  createSocket,
  updateControlData,
  createControlData,
  createTimerData,
  updateTimerData,
  createInfoData,
  createEnergyData,
  stateFN,
} = require("../controllers/socket.controller");

const router = express.Router();

router.get("/", getAllSocketData);
router.post("/update", updateSocketData);
router.post("/create", createSocket);
router.post("/update/controls", updateControlData);
router.post("/create/controls", createControlData);
router.post("/update/timer", updateTimerData);
router.post("/create/timer", createTimerData);
router.post("/create/energy", createEnergyData);
router.post("/create/info", createInfoData);
router.get("/state", stateFN);

module.exports = router;
