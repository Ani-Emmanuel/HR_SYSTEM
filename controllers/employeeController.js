const express = require("express");
const user = require("../models/employeeModel");
const employeeRouter = express.Router();
var BaseRepo = require("../BaseReppository");
var userRepo = new BaseRepo(user.Employee);

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

module.exports = employeeRouter;
