const express = require("express");
const salaryStructureRouter = express.Router();
const BaseRepo = require("../BaseReppository");
const { SalaryStructure } = require("../models/employeeModel");

const salaryStructure = new BaseRepo(SalaryStructure);

salaryStructureRouter
  .route("/")
  .get((req, res, next) => {
    salaryStructure
      .get({})
      .then(result => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(result);
      })
      .catch(err => next(err));
  })
  .post((req, res, next) => {
    salaryStructure
      .post(req.body)
      .then(() => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ message: "Record Created successfully" });
      })
      .catch(err => nexxt(err));
  });

salaryStructureRouter
  .route("/:id")
  .get((req, res, next) => {
    salaryStructure
      .get({ _id: req.params.id })
      .then(result => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(result);
      })
      .catch(err => next(err));
  })
  .put((req, res, next) => {
    salaryStructure
      .put({ _id: req.params.id }, { $set: req.body })
      .then(() => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ message: "Record updated successfully" });
      })
      .catch(err => next(err));
  });

module.exports = salaryStructureRouter;
