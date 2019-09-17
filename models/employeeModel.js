const mongoose = require("mongoose");

const employeeShema = mongoose.Schema(
  {
    firstname: { type: String, required: true },
    middlename: { type: String, required: true },
    surname: { type: String, required: true },
    dob: { type: Date, required: true },
    address: { type: String, required: true },
    sex: { type: String, required: true },
    //passport: { data: Buffer, contentType: String },
    dateOfResume: { type: Date, required: true },
    phone: { type: Number, required: true },
    state: { type: String, required: true },
    religion: { type: String, required: true },
    maritalStatus: { type: String, required: true },
    level: { type: Number, required: true },
    isAdmin: { type: Boolean, required: true },
    nextOfKin: { type: mongoose.Schema.Types.Mixed, required: true },
    garrantors: { type: mongoose.Schema.Types.Mixed, required: true }
  },
  { timestamps: true }
);

const account = mongoose.Schema(
  {
    accountName: { type: String, required: true },
    accountNumber: { type: Number, required: true },
    BankName: { type: String, required: true },
    salary: { type: Number, required: true },
    deductions: { type: Number, default: 0 },
    tax: { type: Number, required: true },
    commission: { type: Number, default: 0 },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", index : true }
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", account);
const Employee = mongoose.model("Employee", employeeShema);

module.exports = { Employee, Account };
