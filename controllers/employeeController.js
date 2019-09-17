const express = require("express");
const user = require("../models/employeeModel");
const employeeRouter = express.Router();
var BaseRepo = require('../BaseReppository');
var userRepo = new BaseRepo(user.Employee);

employeeRouter
  .route("/")
  .get((req, res, next) => {
    userRepo.get({}).then(result => {
      res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(result);
    }).catch(error => {
      next(error)
    })
  })
  .post((req, res, next) => {
    userRepo.post(req.body).then((result)=>{
      res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(result);
    }).catch(error => {
      next(error)
    })
  });

employeeRouter
  .route("/:employeeId")
  .get((req, res, next) => {
    userRepo.get({_id:req.params.employeeId}).then(result => {
      res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(result);
    }).catch(error => {
      next(error)
    })
  })
  .put((req, res, next) => {
    // user.Employee.findByIdAndUpdate(
    //   req.params.employeeId,
    //   {
    //     $set: req.body
    //   },
    //   { new: true }
    // ).then(
    //   employee => {
    //     res.statusCode = 200;
    //     res.setHeader("Content-Type", "application/json");
    //     res.json({ message: `${employee.firstname} Updated successfully` });
    //   },
    //   err => next(err)
    // );

    userRepo.put({_id:req.params.employeeId},req.body).then(result =>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(result);
    }).catch(error => {
      next(error)
    })
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
