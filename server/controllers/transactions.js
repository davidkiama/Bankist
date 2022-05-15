import { Deposit, Withdraw, Transfer, Loan } from "../models/transctions.js";
import User from "../models/user.js";

export const deposit = async (req, res) => {
  const { amount } = req.body;

  if (!req.body) return res.status(401).json({ message: "Unauthorized" });

  //Get user so as to add new trx
  const user = await User.findById(req.userId);
  if (!user) return res.status(401).json({ message: "User does not exist" });

  const newDepo = new Deposit({ amount, fee: 0, initiator: req.userId });
  try {
    await newDepo.save();

    user.transactions.push({ deposit: newDepo });
    await user.save();

    return res.status(201).json(newDepo);
  } catch (error) {
    return res.status(409).json({ message: error });
  }
};

export const withdraw = async (req, res) => {
  const { amount } = req.body;

  if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

  //Get user phone number to use as M-pesa destination
  const user = await User.findById(req.userId);
  if (!user) return res.status(401).json({ message: "User does not exist" });

  const destination = user.telephone;
  const fee = amount * 0.1;

  const newWithdrawal = new Withdraw({ amount, destination, fee });
  try {
    await newWithdrawal.save();

    return res.status(201).json(newDepo);
  } catch (error) {
    return res.status(409).json({ message: error });
  }
};
