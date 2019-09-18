const express = require("express");
const bodyparser = require("body-parser");
const employeeController = require("./controllers/employeeController");
const accountController = require("./controllers/accountController");
const salaryController = require("./controllers/salarycontroller");
const salaryStructure = require("./controllers/salaryStructure");
const mongoose = require("mongoose");

mongoose.Promise = require("bluebird");
const db = require("./db");
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use("/employee", employeeController);
app.use("/account", accountController);
app.use("/salary", salaryController);
app.use("/salary_structure", salaryStructure);

// const app = require("./app");
const port = process.env.port || 3000;

const server = app.listen(port, function() {
  console.log(`Express server listening on ${port}`);
});
accountController;
