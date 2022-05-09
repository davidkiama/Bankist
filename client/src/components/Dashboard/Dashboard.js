import React from "react";

//custom components

import Transactions from "../Transactions/Transactions";
import DepositForm from "../Forms/DepositForm";
import LoanForm from "../Forms/LoanForm";
import TransferForm from "../Forms/TransferForm";
import WithdrawForm from "../Forms/WithdrawForm";

import "./Dashboard.css";
function Dashboard() {
  return (
    <main className="dashboard">
      <div className="dashboard__header">
        <h4>Welcome back, David</h4>
        <span>Kes 37,000/=</span>
      </div>

      <div className="dashboard__main">
        <Transactions />

        <div className="dashboard__forms">
          <DepositForm />
          <LoanForm />
          <TransferForm />
          <WithdrawForm />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
