const express = require("express");
const bodyparser = require("body-parser");
const controller = require("./controllers/employeeController");
const mongoose = require("mongoose");

mongoose.Promise = require("bluebird");
const db = require("./db");
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use("/employee", controller);

// const app = require("./app");
const port = process.env.port || 3000;

const server = app.listen(port, function() {
  console.log(`Express server listening on ${port}`);
});
