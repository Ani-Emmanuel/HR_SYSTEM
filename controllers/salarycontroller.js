const express = require("express");
const salaryRouter = express.Router();
const { Salary } = require("../models/employeeModel");
const BaseRepo = require("../BaseReppository");

const salaryRepo = new BaseRepo(Salary);

salaryRouter
  .route("/")
  .get((req, res, next) => {
    salaryRepo
      .get({})
      .then(result => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(result);
      })
      .catch(err => next(err));
  })
  .post((req, res, next) => {
    data = {
      deductions: req.body.deductions || 0,
      month: req.body.month,
      tax: req.body.tax,
      commission: req.body.commission || 0,
      employee: req.body.employee
    };
    salaryRepo
      .post(data)
      .then(() => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ message: "Record created successfully" });
      })
      .catch(err => next(err));
  });

salaryRouter
  .route("/:id")
  .get((req, res, next) => {
    salaryRepo
      .get({ _id: req.params.id })
      .then(result => {
        res.statusCRouterode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(result);
      })
      .catch(err => next(err));
  })
  .put((req, res, next) => {
    salaryRepo
      .put({ _id: req.body.id }, { $set: req.body })
      .then(() => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ message: "Record Updated successfully" });
      })
      .catch(err => next(err));
  });

module.exports = salaryRouter;
