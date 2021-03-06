import { Deposit, Withdraw, Transfer, Loan } from "../models/transctions.js";
import User from "../models/user.js";

export const deposit = async (req, res) => {
  const { amount } = req.body;

  if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

  //Get user so as to add new trx
  const user = await User.findById(req.userId);
  if (!user) return res.status(401).json({ message: "User does not exist" });

  const newDepo = new Deposit({ amount, fee: 0, initiator: req.userId });
  try {
    await newDepo.save();

    //add a transaction attribute

    const transaction = newDepo.toObject();
    user.transactions.push({ ...transaction, trxType: "Deposit" });
    user.currentBalance += amount; //Updating the user's balance
    await user.save();

    return res.status(200).json({
      currentBalance: user.currentBalance,
      transactions: user.transactions,
      message: `Confirmed. You have deposited Ksh ${newDepo.amount}`,
    });
  } catch (error) {
    return res.status(409).json({ message: error });
  }
};

export const withdraw = async (req, res) => {
  let { amount } = req.body;
  amount = Number(amount);

  if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

  //Get user phone number to use as M-pesa destination
  const user = await User.findById(req.userId);
  if (!user) return res.status(401).json({ message: "User does not exist" });

  if (user.currentBalance < amount + amount * 0.1) {
    return res
      .status(401)
      .json({ message: `You do not have sufficient funds to withdraw amount ${amount}.` });
  }

  //Make the amount negative since its a withdrawal
  amount = -amount;
  const destination = user.email;
  const fee = amount * 0.1;

  const newWithdrawal = new Withdraw({ amount, destination, fee });
  try {
    await newWithdrawal.save();

    const transaction = newWithdrawal.toObject();
    user.transactions.push({ ...transaction, trxType: "Withdrawal" });
    user.currentBalance = user.currentBalance + amount + fee;
    await user.save();

    return res.status(200).json({
      currentBalance: user.currentBalance,
      transactions: user.transactions,
      message: `Confirmed. You have withdrawn Ksh ${newWithdrawal.amount * -1}`,
    });
  } catch (error) {
    return res.status(409).json({ message: error });
  }
};

export const transfer = async (req, res) => {
  let { amount, email } = req.body;

  // Check if user is logged in and valid
  if (!req.userId) return res.status(401).json({ message: "Unauthorized" });
  const user = await User.findById(req.userId);
  if (!user) return res.status(401).json({ message: "User does not exist." });

  // check if we have user with that email
  const receiver = await User.findOne({ email });
  if (!receiver) return res.status(404).json({ message: "No user with that email" });

  //ensure amount + fee requested is less than current balance
  if (amount * 1.1 > user.currentBalance)
    return res.status(409).json({ message: `You don not have enough balance to transfer ${amount}` });

  amount = -amount; //negate figure since its a transfer
  const fee = amount * 0.1;
  const initiator = user.email;

  const newTransfer = new Transfer({ amount, fee, initiator, receiver: receiver.email });

  try {
    await newTransfer.save();

    // Add trx to the initiator/sender
    const transaction = newTransfer.toObject();
    user.transactions.push({ ...transaction, trxType: "Transfer" });
    user.currentBalance = user.currentBalance + amount + fee;
    await user.save();

    // Add trx to the receiver
    receiver.transactions.push({ ...transaction, amount: -amount, fee: 0, trxType: "Receive" });
    receiver.currentBalance = receiver.currentBalance + -amount;
    await receiver.save();

    return res.status(200).json({
      currentBalance: user.currentBalance,
      transactions: user.transactions,
      message: `Confirmed. You have transfered Ksh ${newTransfer.amount * -1} to ${newTransfer.receiver}`,
    });
  } catch (error) {
    return res.status(409).json({ message: error });
  }
};

export const loan = async (req, res) => {
  let { amount } = req.body;
  amount = Number(amount);

  if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

  //Get user sending request
  const user = await User.findById(req.userId);
  if (!user) return res.status(401).json({ message: "User does not exist" });

  // Check if amount requested is greater than 60% of user's account balance
  if (amount > user.currentBalance * 0.6) {
    return res.status(409).json({ message: `Denied. Can not approve loan of amount ${amount} requested.` });
  }

  const fee = amount * -0.1; //fee is 10%
  const paybackPeriod = 60;
  const interest = amount * 0.14;

  const newLoan = new Loan({ amount, fee, paybackPeriod, interest });

  try {
    await newLoan.save();

    const transaction = newLoan.toObject();
    user.transactions.push({ ...transaction, trxType: "Loan" });
    user.currentBalance = user.currentBalance + amount + fee;
    await user.save();

    return res.status(200).json({
      currentBalance: user.currentBalance,
      transactions: user.transactions,
      message: `Confirmed. Your loan application of amount ${newLoan.amount} has been approved`,
    });
  } catch (error) {
    return res.status(409).json({ message: error });
  }
};

export const dashboardInfo = async (req, res) => {
  if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    //get user sending the request
    const user = await User.findById(req.userId);
    if (!user) return res.status(401).json({ message: "User does not exist" });

    return res.status(200).json({ currentBalance: user.currentBalance, transactions: user.transactions });
  } catch (error) {
    return res.status(409).json({ message: error });
  }
};
