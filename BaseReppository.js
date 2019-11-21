var mongoose = require("mongoose");
var { Employee } = require("./models/employeeModel");
var { promisify } = require("util");

var BaseRepository = function(
  schema,
  collectionName,
  localfield,
  foreignfield,
  output
) {
  this.schema = schema;

  //retriving function
  this.get = function(query = {}, pagesize = 20, pagenumber = 1) {
    return this.schema
      .find(query)
      .skip((parseInt(pagenumber) - 1) * pagesize)
      .limit(parseInt(pagesize));
  };

  //creating function
  this.post = function(query = {}) {
    return this.schema.create(query);
  };

  //updating function
  this.put = function(id = {}, query) {
    return this.schema.findByIdAndUpdate(id, { $set: query });
  };

  //deleting function
  this.delete = function(id = {}) {
    return this.schema.findByIdAndRemove(id);
  };

  //mongo Aggregation
  this.aggregation = function() {
    if (arguments.length) {
      if (arguments.length == 4) {
        return this.schema.aggregate([
          {
            $lookup: {
              from: `${arguments[0]}`,
              localField: `${arguments[1]}`,
              foreignField: `${arguments[2]}`,
              as: `${arguments[3]}`
            }
          },
          {
            $unwind: `$${arguments[3]}`
          }
        ]);

      } else if (arguments.length == 8) {
        return this.schema.aggregate([
          {
            $lookup: {
              from: `${arguments[0]}`,
              localField: `${arguments[1]}`,
              foreignField: `${arguments[2]}`,
              as: `${arguments[3]}`
            }
          },
          {
            $unwind: {
              path: `$${arguments[3]}}`,
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $lookup: {
              from: `${arguments[4]}`,
              localField: `${arguments[5]}`,
              foreignField: `${arguments[6]}`,
              as: `${arguments[7]}`
            }
          },
          {
            $unwind: {
              path: `$${arguments[7]}`,
              preserveNullAndEmptyArrays: true
            }
          }
        ]);
      }
    }
  };
};

module.exports = BaseRepository;
