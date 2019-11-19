const express = require("express");
const User = require("../models/employeeModel");
const employeeRouter = express.Router();
var BaseRepo = require("../BaseReppository");
var userRepo = new BaseRepo(User.Employee);
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

employeeRouter.route("/:employeeId/account").get((req, res, next) => {
  userRepo
    .aggregation("salaries", "_id", "employee", "employee_salary")
    .then(leave => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(leave);
    })
    .catch(e => {
      next(e);
    });
});

employeeRouter.route("/:employeeId/fulldetails").get((req, res, next) => {
  userRepo
    .get({ _id: req.params.employeeId })
    .then(user => {
      user
        .aggregate([
          {
            $lookup: {
              from: "salaries",
              localField: "_id",
              foreignField: "employee",
              as: "salary"
            }
          },
          {
            $unwind: "$_salary"
          },
          {
            $lookup: {
              from: "Leave",
              localField: "_id",
              foreignField: "employee",
              as: "_leave"
            }
          },
          {
            $unwind: "$_leave"
          }
        ])
        .then(employee => {
          res.statusCode(200);
          res.setHeader("Content-Type", "application/json");
          res.json(employee);
        })
        .catch(e => {
          next(e);
        });
    })
    .catch(e => {
      next(e);
    });
});
module.exports = employeeRouter;
