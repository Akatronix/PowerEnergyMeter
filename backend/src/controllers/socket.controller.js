const {
  SocketModel,
  ControlModel,
  TimerModel,
  InfoModel,
  EnergyModel,
} = require("../models/Socket.model");

// get all data route
async function getAllSocketData(req, res) {
  try {
    const socket = await SocketModel.find();
    if (!socket) return res.status(404).send({ message: "not found" });

    const energy = await EnergyModel.find();
    if (!energy) return res.status(404).send({ message: "not found" });

    res
      .status(200)
      .send({ success: "all data", data: socket, totalEnergy: energy });
  } catch (error) {
    console.log("something went wrong!:", error);
    return res.status(500).send({ "something went wrong!": error });
  }
}
// get all data route
async function stateFN(req, res) {
  try {
    const info = await ControlModel.find();
    if (!info) return res.status(404).send({ message: "not found" });

    res.status(200).send(info);
  } catch (error) {
    console.log("something went wrong!:", error);
    return res.status(500).send({ "something went wrong!": error });
  }
}

// create a new socket route
async function createSocket(req, res) {
  try {
    const newSocket = await SocketModel.create({ ...req.body });

    if (!newSocket) return res.status(500).send({ message: "fail to create" });

    await newSocket.save;

    return res.status(201).send({
      success: "created successfully...",
      data: newSocket,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).send({ error: error });
  }
}

// update socket route
async function updateSocketData(req, res) {
  const { data } = req.body;
  const { total } = req.body;
  const { tid } = total;
  console.log(req.body);

  try {
    const updates = data.map(async (item) => {
      const { _id, ...updateFields } = item;
      await SocketModel.findByIdAndUpdate(_id, updateFields, { new: true });
    });

    // update all sensor value
    await Promise.all(updates);
    const socket = await SocketModel.find();
    if (!socket) return res.status(404).send({ message: "not found" });

    // query the control model
    const control = await ControlModel.find();
    if (!control) return res.status(404).send({ message: "not found" });

    // query the timer model
    const timer = await TimerModel.find();
    if (!timer) return res.status(404).send({ message: "not found" });

    // updating total energy
    const eneData = { totalEnergy: "" };

    eneData.totalEnergy = total.totalEnergy;

    const newene = await EnergyModel.findByIdAndUpdate(
      tid,
      { ...eneData },
      { new: true }
    );

    if (!newene)
      return res.status(404).send({ message: "can not find energy" });

    res.status(200).json({
      message: "Database updated successfully",
      controls: control,
      timers: timer,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).send({ error: error });
  }
}

// create control route
async function createControlData(req, res) {
  try {
    const newControl = await ControlModel.create({ ...req.body });

    if (!newControl) return res.status(500).send({ message: "fail to create" });

    await newControl.save;

    return res.status(201).send({
      success: "created successfully...",
      data: newControl,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).send({ error: error });
  }
}

// update control route
async function updateControlData(req, res) {
  const { id } = (data = req.body);

  console.log(req.body);
  try {
    // const id = await ControlModel.find({ socketName });
    // console.log(id);
    const result = await ControlModel.findByIdAndUpdate(
      id,
      { ...data },
      { new: true }
    );

    if (!result && !id) return res.status(404).send({ message: "not found" });

    res.status(200).json({ message: "Database updated successfully", result });
  } catch (error) {
    console.log("Error", error);
    res.status(500).send({ error: error });
  }
}
// create timer route
async function createTimerData(req, res) {
  try {
    const newTimer = await TimerModel.create({ ...req.body });

    if (!newTimer) return res.status(500).send({ message: "fail to create" });

    await newTimer.save;

    return res.status(201).send({
      success: "created successfully...",
      data: newTimer,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).send({ error: error });
  }
}

// update timer route
async function updateTimerData(req, res) {
  const { socketName } = req.body;
  const data = req.body;

  try {
    const result = await TimerModel.updateMany({ socketName }, { $set: data });

    if (!result) return res.status(404).send({ message: "not found" });

    res
      .status(200)
      .json({ message: "Database updated successfully", success: true });
  } catch (error) {
    console.log("Error", error);
    res.status(500).send({ error: error });
  }
}

// create info route
async function createInfoData(req, res) {
  try {
    const newinfo = await InfoModel.create({ ...req.body });

    if (!newinfo) return res.status(500).send({ message: "fail to create" });

    await newinfo.save;

    return res.status(201).send({
      success: "created successfully...",
      data: newinfo,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).send({ error: error });
  }
}
// create energy route
async function createEnergyData(req, res) {
  try {
    const newenergy = await EnergyModel.create({ ...req.body });

    if (!newenergy) return res.status(500).send({ message: "fail to create" });

    await newenergy.save;

    return res.status(201).send({
      success: "created successfully...",
      data: newenergy,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).send({ error: error });
  }
}

module.exports = {
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
};
