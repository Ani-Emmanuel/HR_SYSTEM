const express = require("express");
const employee = require("../models/employeeModel");
const employeeRouter = express.Router();

employeeRouter
  .route("/")
  .all((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    next();
  })
  .get((req, res, next) => {
    employee.Employee.find({}, (err, employee) => {
      if (err) {
        res.status(404).send({
          status: "Failed",
          message: new Error("Could not retrieve all the employee")
        });
      }
      res.status(200).send({ status: "True", payload: employee });
    });
  })
  .post((req,res,next)=>{
   let payload = {
      firstname: req.body.firstname,
      surname: req.body.surname,
      middlename: req.body.middlename,
      dob: req.body.dob,
      address: req.body.address,
      sex: req.body.address,
      dateOfResume: req.body.dateOfResume,
      phone: req.body.phone,    
      state: req.body.state,
      religion: req.body.religion,
      maritalStatus: req.body.maritalStatus,
      level: req.body.level,
      isAdmin: req.body.isAdmin,
      nextOfKin: req.body.nextOfKin,
      garrantors: req.body.garrantors
    }
    employee.Employee.create(payload,(err, payload)=>{
      if (err) {
        res.status(404).send({
          status: "Failed",
          message: JSON.stringify(err)
        });
      }
      res.status(200).send({ status: "True", payload: payload });
    })
  })


  module.exports = employeeRouter;