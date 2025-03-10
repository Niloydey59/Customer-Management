const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const customerSchema = new Schema(
  {
    CusID: { type: String, required: true, unique: true },
    CompID: { type: String },
    Name: { type: String, required: true },
    Phone: { type: String },
    Phone2: { type: String },
    Email: { type: String },
    DebitHead: { type: Number, default: 0 },
    CreditHead: { type: Number, default: 0 },
    OpenBalance: { type: Number, default: 0 },
    Website: { type: String },
    Address: { type: String },
    City: { type: String },
    Zipcode: { type: String },
    Country: { type: String },
    ContactPerson: { type: String },
    JobPosition: { type: String },
    ContactPhone: { type: String },
    ContactMobile: { type: String },
    ContactEmail: { type: String },
    CreateDate: { type: Date, default: Date.now },
    DeliveryAddress: { type: String },
    BranchID: { type: String },
    CMdays: { type: Number },
    DueLimit: { type: Number },
    TDS: { type: Number },
    VDS: { type: Number },
    AgentID: { type: String },
    BalanceType: { type: String },
    CustomerCode: { type: String },
    Type: { type: String },
    crefitlimit: { type: Number },
    SalesPerson: { type: String },
    AreaID: { type: String },
    Code: { type: String },
    Custype: { type: String },
    autocode: { type: Boolean, default: false },
    CusRemarks: { type: String },
    BirthDate: { type: Date },
    IsLoyal: { type: Boolean, default: false },
    LoyaltyActivationDate: { type: Date },
    LoyalCardNo: { type: String },
    ZoneID: { type: String },
  },
  { timestamps: true }
);

const Customer = model("Customers", customerSchema);

module.exports = Customer;
