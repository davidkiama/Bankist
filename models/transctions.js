import mongoose from "mongoose";

const DepositSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  fee: { type: Number, required: true, default: 0 },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const WithdrawSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  fee: { type: Number, required: true },
  destination: { type: String, required: true },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const TransferSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  fee: { type: Number, required: true },
  initiator: { type: String, required: true },
  receiver: { type: String, required: true },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const LoanSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  fee: { type: Number, required: true },
  interest: { type: Number, required: true },
  paybackPeriod: { type: String, required: true },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const Deposit = mongoose.model("Deposit", DepositSchema);
export const Withdraw = mongoose.model("Withdraw", WithdrawSchema);
export const Transfer = mongoose.model("Transfer", TransferSchema);
export const Loan = mongoose.model("Loan", LoanSchema);
