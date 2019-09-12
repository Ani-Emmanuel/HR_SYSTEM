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
  level: { type: Number, required: true },
  isAdmin: { type: Boolean, required: true },
  nextOfKin: { type: mixed, required: true }
});

const payroll = mongoose.Schema({
  accountNumber: { type: Number, required: true },
  salary: { type: Number, required: true },
  tax: { type: Number, required: true },
  commission: { type: Number, default: 0 },
  employee: { type: Schema.Types.ObjectId, ref: "Employee" }
});

const PayRoll = mongoose.model("PayRoll", payroll);
const Employee = mongoose.model("Employee", employeeShema);

module.exports = { Employee, PayRoll };
