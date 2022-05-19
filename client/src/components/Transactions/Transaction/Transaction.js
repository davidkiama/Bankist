import React from "react";

function Transaction({ transaction }) {
  return (
    <div className="transaction">
      <div className="trx__row--1">
        <span
          className={`${transaction.amount > 0 ? "trx__type--deposit" : "trx__type--withdrawal"} trx__type`}
        >
          {transaction.trxType}
        </span>
        <span className="trx__amount">{transaction.amount} </span>
      </div>

      <span className="trx__fee">Fee: {transaction.fee} </span>
    </div>
  );
}

export default Transaction;
