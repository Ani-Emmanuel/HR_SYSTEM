const express = require("express");
const User = require("../models/employeeModel");
const employeeRouter = express.Router();
var BaseRepo = require("../BaseReppository");
var userRepo = new BaseRepo(User.Employee);
var salaryRepo = new BaseRepo(User.SalaryStructure);
var db = require("../db");

employeeRouter
  .route("/")
  .get((req, res, next) => {
    userRepo
      .get({})
      .then(result => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(result);
      })
      .catch(error => {
        next(error);
      });
  })
  .post((req, res, next) => {
    userRepo
      .post(req.body)
      .then(result => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(result);
      })
      .catch(error => {
        next(error);
      });
  });

employeeRouter
  .route("/:employeeId")
  .get((req, res, next) => {
    userRepo
      .get({ _id: req.params.employeeId })
      .then(result => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(result);
      })
      .catch(error => {
        next(error);
      });
  })
  .put((req, res, next) => {
    userRepo
      .put({ _id: req.params.employeeId }, req.body)
      .then(result => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(result);
      })
      .catch(error => {
        next(error);
      });
  });

employeeRouter.route("/:employeeId/leave").get((req, res, next) => {
  userRepo
    .aggregation("leaves", "_id", "employee", "employee_leave")
    .then(leave => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(leave);
    })
    .catch(e => {
      next(e);
    });
});

employeeRouter.route("/:employeeId/account").get(async (req, res, next) => {
  // userRepo
  //   .aggregation("salaries", "_id", "employee", "employee_salary")
  //   .then(leave => {
  //     let salaries = salaryRepo.get({ _id: leave.employee_salary.salary});
  //     delete leave.employee_salary.salary;
  //     leave.employee_salary.salary = salaries
  //     res.statusCode = 200;
  //     res.setHeader("Content-Type", "application/json");
  //     res.json(leave);
  //   })
  //   .catch(e => {
  //     next(e);
  //   });.aggregation
  try {
    let aggregated = await userRepo.aggregation(
      "salaries",
      "_id",
      "employee",
      "employee_salary"
    );
    let converted = Array.from(aggregated);
    let salary = await salaryRepo.get({
      _id: converted[0]["employee_salary"].salary
    });
    // console.log(salary[0]._id)
    delete converted[0]["employee_salary"].salary;
    delete salary[0]._id;
    converted[0]["employee_salary"].salary = salary;
    res.status(200).json(converted);
  } catch (error) {
    next(error);
  }
});

employeeRouter.route("/:employeeId/fulldetails").get((req, res, next) => {
  userRepo.get({ _id: req.params.employeeId });
  userRepo
    .aggregation(
      "salaries",
      "_id",
      "employee",
      "employee_salary",
      "leaves",
      "_id",
      "employee",
      "employee_leave"
    )
    .then(employee => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(employee);
    })
    .catch(e => {
      next(e);
    });
});
module.exports = employeeRouter;
