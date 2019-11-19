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

  this.get = function(query = {}, pagesize = 20, pagenumber = 1) {
    return this.schema
      .find(query)
      .skip((parseInt(pagenumber) - 1) * pagesize)
      .limit(parseInt(pagesize));
  };

  this.post = function(query = {}) {
    return this.schema.create(query);
  };

  this.put = function(id = {}, query) {
    return this.schema.findByIdAndUpdate(id, { $set: query });
  };

  this.delete = function(id = {}) {
    return this.schema.findByIdAndRemove(id);
  };

  this.aggregation = function(collectionName, local, foreign, output) {
    return this.schema.aggregate([
      {
        $lookup: {
          from: `${collectionName}`,
          localField: `${local}`,
          foreignField: `${foreign}`,
          as: `${output}`
        }
      },
      {
        $unwind: `$${output}`
      }
    ]);
  };
};

module.exports = BaseRepository;
