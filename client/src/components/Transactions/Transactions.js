import React from "react";
import { useSelector } from "react-redux";

import Transaction from "./Transaction/Transaction";
import "./Transactions.css";

function Transactions() {
  const transactions = useSelector((state) => state.userAccount.transactions);
  return (
    <div className="transactions">
      {transactions &&
        transactions.map((transaction) => <Transaction key={transaction._id} transaction={transaction} />)}
    </div>
  );
}

export default Transactions;
