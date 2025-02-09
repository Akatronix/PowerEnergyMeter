const {
  SocketModel,
  ControlModel,
  TimerModel,
  InfoModel,
  EnergyModel,
} = require("../models/Socket.model");
const myData = require("../../data.js");

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
  const myDataArray = myData()[0];
  const {
    Current1,
    Current2,
    Current3,
    Current4,
    Current5,
    Voltage,
    Energy1,
    Energy2,
    Energy3,
    Energy4,
    Energy5,
    KiloWatt1,
    KiloWatt2,
    KiloWatt3,
    KiloWatt4,
    KiloWatt5,
    TotalEnergy,
  } = req.body;

  // first socket data
  myDataArray.data[0].current = Current1 || myDataArray.data[0].current;
  myDataArray.data[0].voltage = Voltage || myDataArray.data[0].voltage;
  myDataArray.data[0].power = KiloWatt1 || myDataArray.data[0].power;
  myDataArray.data[0].energy = Energy1 || myDataArray.data[0].energy;

  // second socket data
  myDataArray.data[1].current = Current2 || myDataArray.data[1].current;
  myDataArray.data[1].voltage = Voltage || myDataArray.data[1].voltage;
  myDataArray.data[1].power = KiloWatt2 || myDataArray.data[1].power;
  myDataArray.data[1].energy = Energy2 || myDataArray.data[1].energy;

  // third socket data
  myDataArray.data[2].current = Current3 || myDataArray.data[2].current;
  myDataArray.data[2].voltage = Voltage || myDataArray.data[2].voltage;
  myDataArray.data[2].power = KiloWatt3 || myDataArray.data[2].power;
  myDataArray.data[2].energy = Energy3 || myDataArray.data[2].energy;

  // fourth socket data
  myDataArray.data[3].current = Current4 || myDataArray.data[3].current;
  myDataArray.data[3].voltage = Voltage || myDataArray.data[3].voltage;
  myDataArray.data[3].power = KiloWatt4 || myDataArray.data[3].power;
  myDataArray.data[3].energy = Energy4 || myDataArray.data[3].energy;

  // fiveth socket data
  myDataArray.data[4].current = Current5 || myDataArray.data[4].current;
  myDataArray.data[4].voltage = Voltage || myDataArray.data[4].voltage;
  myDataArray.data[4].power = KiloWatt5 || myDataArray.data[4].power;
  myDataArray.data[4].energy = Energy5 || myDataArray.data[4].energy;

  myDataArray.total.totalEnergy = TotalEnergy || myDataArray.total.totalEnergy;
  console.log(myDataArray);

  const { data } = myDataArray;
  const { total } = myDataArray;
  const { tid } = total;

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

    const socketDataArray = control.map((item) => item.socketData);

    const formattedTimers = timer.map((item) => {
      let [hour, minute, second, period] = item.time.split(/[:\s]/);

      return {
        socketName: item.socketName,
        hour,
        minute,
        second,
        period,
        action: item.action,
      };
    });

    res.status(200).json({
      message: "Database updated successfully",
      controls: socketDataArray,
      timers: formattedTimers,
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
