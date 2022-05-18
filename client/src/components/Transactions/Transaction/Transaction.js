import React from "react";

function Transaction({ transaction }) {
  return (
    <div>
      <span>Amount: {transaction.amount} </span>
      <span>Transaction: {transaction.trxType} </span>
      <span>Fee: {transaction.fee} </span>
    </div>
  );
}

export default Transaction;
