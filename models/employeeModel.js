const mongoose = require("mongoose");

const employeeShema = mongoose.Schema(
  {
    firstname: { type: String, required: true },
    middlename: { type: String },
    surname: { type: String, required: true },
    dob: { type: Date, required: true },
    address: { type: String, required: true },
    sex: { type: String, required: true },
    // passport: { data: Buffer, contentType: String },
    resumption_Date: { type: Date, required: true },
    isActive: { type: Boolean, required: true },
    phone: { type: Number, required: true },
    state: { type: String, required: true },
    religion: { type: String, required: true },
    maritalStatus: { type: String, required: true },
    level: { type: Number, required: true },
    isAdmin: { type: Boolean, required: true },
    nextOfKin: { type: mongoose.Schema.Types.Mixed, required: true },
    garrantors: { type: mongoose.Schema.Types.Mixed, required: true },
    paid: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const account = mongoose.Schema(
  {
    accountName: { type: String, required: true },
    accountNumber: { type: Number, required: true },
    bankName: { type: String, required: true },
    bankCode: { type: String, required: true },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee"
    }
  },
  { timestamps: true }
);

const salary = mongoose.Schema({
  deductions: { type: Number, default: 0 },
  month: { type: String, required: true },
  tax: { type: Number, required: true },
  commission: { type: Number, default: 0 },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee"
  },
  salary: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "SalaryStructure" 
  }
});

const salaryStructure = mongoose.Schema({
  level: { type: Number, required: true },
  baseSalary: { type: Number, required: true }
});

const leave = mongoose.Schema({
  purpose: { type: String, required: true },
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  startDate: { type: Date, default: Date.now() },
  endDate: { type: Date },
  duration: Number
});

const SalaryStructure = mongoose.model("SalaryStructure", salaryStructure);
const Salary = mongoose.model("Salary", salary);
const Account = mongoose.model("Account", account);
const Employee = mongoose.model("Employee", employeeShema);
const Leave = mongoose.model("Leave", leave);

module.exports = { Employee, Account, Salary, SalaryStructure, Leave };
