require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const socketData = require("./src/routes/socket.route");

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).send("Hello, welcome to backend");
});

app.use("/data", socketData);

mongoose
  .connect(process.env.MONGoDB_CONNECTION_STRING)
  .then(() => {
    console.log("connected to database");
    app.listen(port, () => {
      console.log(`server started on port: ${port}`);
    });
  })
  .catch(() => {
    console.log("error connecting to database");
  });
