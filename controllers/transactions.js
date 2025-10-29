import { Deposit, Withdraw, Transfer, Loan } from "../models/transctions.js";
import User from "../models/user.js";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const OXAPAY_API_KEY = process.env.OXAPAY_API_KEY;
const OXAPAY_CREATE_INVOICE_URL = process.env.OXAPAY_CREATE_INVOICE_URL;

const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL;

// export const deposit = async (req, res) => {
//   const { amount } = req.body;

//   if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

//   //Get user so as to add new trx
//   const user = await User.findById(req.userId);
//   if (!user) return res.status(401).json({ message: "User does not exist" });

//   const url = process.env.OXAPAY_CREATE_INVOICE_URL;

//   const headers = {
//     merchant_api_key: process.env.OXAPAY_API_KEY,
//     "Content-Type": "application/json",
//   };

//   const data = {
//     amount: amount,
//     currency: "USD",
//     lifetime: 30,
//     fee_paid_by_payer: 1,
//     under_paid_coverage: 2.5,
//     to_currency: "USDT",
//     auto_withdrawal: false,
//     mixed_payment: true,
//     callback_url: "https://example.com/callback",
//     return_url: "https://example.com/success",
//     email: "customer@oxapay.com",
//     order_id: "ORD-12345",
//     thanks_message: "Thanks message",
//     description: "Order #12345",
//     sandbox: false,
//   };

//   let paymentUrl = "";

//   axios
//     .post(url, data, { headers })
//     .then((response) => {
//       console.log(response.data);

//       paymentUrl = response?.data?.data?.payment_url;
//       console.log("URL TO PAY", paymentUrl);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

// dotenv.config();

// const OXAPAY_API_KEY = process.env.OXAPAY_API_KEY;
// const OXAPAY_CREATE_INVOICE_URL = process.env.OXAPAY_CREATE_INVOICE_URL;

export const deposit = async (req, res) => {
  const { amount } = req.body;

  if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  try {
    const headers = {
      merchant_api_key: OXAPAY_API_KEY,
      "Content-Type": "application/json",
    };

    const data = {
      amount,
      currency: "USD",
      lifetime: 30,
      fee_paid_by_payer: 1,
      under_paid_coverage: 2.5,
      to_currency: "USDT",
      auto_withdrawal: false,
      mixed_payment: true,
      callback_url: `${process.env.PUBLIC_BASE_URL}/api/webhook/oxapay`,
      return_url: `${process.env.PUBLIC_BASE_URL}/success`,
      email: user.email,
      order_id: `ORD-${Date.now()}`,
      thanks_message: "Thanks for your payment!",
      description: `Deposit for user ${user._id}`,
      sandbox: false,
    };

    const response = await axios.post(OXAPAY_CREATE_INVOICE_URL, data, { headers });

<<<<<<< HEAD:controllers/transactions.js
    return res.status(200).json({
      currentBalance: user.currentBalance,
      transactions: user.transactions,
      message: `Confirmed. You have deposited Ksh ${newDepo.amount}`,
    });
=======
    const paymentUrl = response?.data?.data?.payment_url;

    if (!paymentUrl) {
      return res.status(400).json({ message: "Failed to generate payment URL" });
    }

    // Return the URL to the client
    res.status(200).json({ paymentUrl });
>>>>>>> origin:server/controllers/transactions.js
  } catch (error) {
    console.error("Deposit Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Internal Server Error" });
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
<<<<<<< HEAD:controllers/transactions.js
    return res.status(409).json({ message: `You don not have enough balance to transfer ${amount}` });
=======
    return res
      .status(409)
      .json({ message: `You don not have enough balance to transfer ${amount}` });
>>>>>>> origin:server/controllers/transactions.js

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
<<<<<<< HEAD:controllers/transactions.js
      message: `Confirmed. You have transfered Ksh ${newTransfer.amount * -1} to ${newTransfer.receiver}`,
=======
      message: `Confirmed. You have transfered Ksh ${newTransfer.amount * -1} to ${
        newTransfer.receiver
      }`,
>>>>>>> origin:server/controllers/transactions.js
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
<<<<<<< HEAD:controllers/transactions.js
    return res.status(409).json({ message: `Denied. Can not approve loan of amount ${amount} requested.` });
=======
    return res
      .status(409)
      .json({ message: `Denied. Can not approve loan of amount ${amount} requested.` });
>>>>>>> origin:server/controllers/transactions.js
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

<<<<<<< HEAD:controllers/transactions.js
    return res.status(200).json({ currentBalance: user.currentBalance, transactions: user.transactions });
=======
    return res
      .status(200)
      .json({ currentBalance: user.currentBalance, transactions: user.transactions });
>>>>>>> origin:server/controllers/transactions.js
  } catch (error) {
    return res.status(409).json({ message: error });
  }
};

export const oxapayWebhook = async (req, res) => {
  try {
    const payload = req.body;
    const track_id = payload?.data?.track_id;
    const status = payload?.data?.status?.toLowerCase();

    if (!track_id) return res.status(400).json({ message: "Invalid payload" });

    // Find the deposit using the OxaPay track ID
    const deposit = await Deposit.findOne({ oxapayTrackId: track_id });
    if (!deposit) return res.status(404).json({ message: "Deposit not found" });

    // If the payment is successful
    if (["paid", "confirmed", "completed", "success"].includes(status)) {
      const user = await User.findById(deposit.initiator);

      if (user && deposit.status !== "confirmed") {
        user.currentBalance += deposit.amount;
        deposit.status = "confirmed";

        await user.save();
        await deposit.save();

        console.log(`✅ Deposit ${track_id} confirmed for user ${user.email}`);
      }
    }
    // If the payment failed or expired
    else if (["failed", "expired", "canceled"].includes(status)) {
      deposit.status = "failed";
      await deposit.save();
      console.log(`❌ Deposit ${track_id} failed or expired`);
    }

    res.status(200).json({ message: "Webhook processed successfully" });
  } catch (error) {
    console.error("OxaPay Webhook Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
