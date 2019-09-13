const express = require("express");
const employee = require("../models/UserModel");
const employeeRouter = express.Router();

employeeRouter
  .route("/")
  .all((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode(200);
    next();
  })
  .get((req, res, next) => {
    employee.find({}, (err, employee) => {
      if (err) {
        res.statusCode(404).send({
          status: "Failed",
          message: new Error("Could not retrieve all the employee")
        });
      }
      res.statusCode(200).send({ status: "True", payload: employee });
      
    });
  });
