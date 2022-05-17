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
    await user.save();

    return res.status(201).json(newDepo);
  } catch (error) {
    return res.status(409).json({ message: error });
  }
};

export const withdraw = async (req, res) => {
  let { amount } = req.body;

  if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

  //Get user phone number to use as M-pesa destination
  const user = await User.findById(req.userId);
  if (!user) return res.status(401).json({ message: "User does not exist" });

  //Make the amount negative since its a withdrawal
  amount = -amount;
  const destination = user.telephone;
  const fee = amount * 0.1;

  const newWithdrawal = new Withdraw({ amount, destination, fee });
  try {
    await newWithdrawal.save();

    const transaction = newWithdrawal.toObject();
    user.transactions.push({ ...transaction, trxType: "Withdrawal" });
    await user.save();

    return res.status(201).json(newWithdrawal);
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

  amount = -amount;
  const fee = amount * 0.1;
  const initiator = user.email;

  const newTransfer = new Transfer({ amount, fee, initiator, receiver: receiver.email });

  try {
    await newTransfer.save();

    // Add trx to the initiator
    const transaction = newTransfer.toObject();
    user.transactions.push({ ...transaction, trxType: "Transfer" });
    await user.save();

    // Add trx to the receiver
    receiver.transactions.push({ ...transaction, amount: -amount, fee: 0, trxType: "Receive" });
    await receiver.save();
    console.log(receiver.transactions);

    return res.status(201).json(newTransfer);
  } catch (error) {
    return res.status(409).json({ message: error });
  }
};
