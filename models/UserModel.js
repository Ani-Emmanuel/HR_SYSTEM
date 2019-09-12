const mongoose = require("mongoose");

const employeeShema = mongoose.Schema({
  firstname: { type: String, required: true },
  middlename: { type: String, required: true },
  Surname: { type: String, required: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true },
  sex: { type: String, required: true },
  passport: { data: Buffer, contentType: String },
  dateOfResume: { type: Date, required: true },
  phone: { type: Number, min: 11, max: 14, required: true },
  state: { type: String, required: true },
  religion: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  salary: { type: Number, required: true },
  level: { type: Number, required: true },
  isAdmin: { type: Boolean, required: true },
  nextOfKin: { type: mixed, required: true }
});

// const nextOfKin = mongoose.Schema({
//   firstname: String,
//   middlename: String,
//   Surname: String,String
//   address: String,
//   sex: String,
//   phone: Number,
//   state: String,
//   religion: String,
//   employee: { type: Schema.Types.ObjectId, ref: "Employee" }
// });

// const nextOfKin = mongoose.model("nextOfKin", nextOfKin);
const Employee = mongoose.model("Employee", employeeShema);

module.exports = Employee;
