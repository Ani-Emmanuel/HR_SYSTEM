const express = require("express");
const user = require("../models/employeeModel");
const employeeRouter = express.Router();

employeeRouter
  .route("/")
  .get((req, res, next) => {
    user.Employee.find({}).then(
      employees => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(employees);
      },
      err => next(err)
    );
  })
  .post((req, res, next) => {
    user.Employee.create(req.body).then(
      () => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ meesage: `employee record created successfully` });
      },
      err => next(err)
    );
  });

employeeRouter
  .route("/:employeeId")
  .get((req, res, next) => {
    user.Employee.findById(req.params.employeeId).then(
      employee => {
        res.employeesstatusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(employee);
      },
      err => next(err)
    );
  })
  .put((req, res, next) => {
    user.Employee.findByIdAndUpdate(
      req.params.employeeId,
      {
        $set: req.body
      },
      { new: true }
    ).then(
      employee => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ message: `${employee.firstname} Updated successfully` });
      },
      err => next(err)
    );
  })
  .delete((req, res, next) => {
    user.Employee.findById(req.params.employeeId).then(employee => {
      user.Employee.findByIdAndRemove(req.params.employeeId).then(
        () => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({
            user: `${employee.firstname} has been  deleted successfully`
          });
        },
        err => next(err)
      );
    });
  });

module.exports = employeeRouter;
