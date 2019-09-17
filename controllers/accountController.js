const express = require("express");
const employeeAccount = require("../controllers/accountController");

const Router = express.Router();

Router
  .get((req, res, next) => {
    employeeAccount.Account.findById(req.params.accountId).then(
      account => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ payload: account });
      },
      err => next(err)
    );
  })
  .post((req, res, next) => {
    employeeAccount.Account.create(req.body).then(
      () => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ message: `Account created successfully` });
      },
      err => next(err)
    );
  })
  .put((req, res, next) => {
    employeeAccount.Account.findByIdAndUpdate(req.body).then(
      account => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          message: `${account.firstname} Account number updated successfully`
        });
      },
      err => next(err)
    );
  });

  module.exports = Router;
