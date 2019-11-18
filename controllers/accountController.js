const express = require("express");
const { Account } = require("../models/employeeModel");
const BaseRepo = require("../BaseReppository");

const accoutRepo = new BaseRepo(Account);

const accountRouter = express.Router();
accountRouter
  .route("/")
  .get((req, res, next) => {
    accoutRepo
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
      accountName: req.body.accountName,
      accountNumber: req.body.accountNumber,
      bankName: req.body.bankName,
      bankCode: req.body.bankCode,
      employee: req.body.employee
    };
    accoutRepo
      .post(data)
      .then(() => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          message: `Account created successfully`
        });
      })
      .catch(err => next(err));
  });

accountRouter
  .route("/:id")
  .get((req, res, next) => {
    accoutRepo
      .get({ _id: req.params.id })
      .then(result => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(result);
      })
      .catch(err => next(err));
  })
  .put((req, res, next) => {
    accoutRepo
      .put({ _id: req.params.id }, { $set: req.body })
      .then(() => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          message: `Account details updated successfully`
        });
      })
      .catch(err => next(err));
  });

module.exports = accountRouter;
