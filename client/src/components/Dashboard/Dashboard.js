import React, { useState } from "react";
import { useSelector } from "react-redux";

//custom components

import Transactions from "../Transactions/Transactions";
import DepositForm from "../Forms/DepositForm";
import LoanForm from "../Forms/LoanForm";
import TransferForm from "../Forms/TransferForm";
import WithdrawForm from "../Forms/WithdrawForm";

import "./Dashboard.css";
function Dashboard() {
  const [userProfile, setUserProfile] = useState(JSON.parse(localStorage.getItem("profile")));

  const userAccount = useSelector((state) => state.userAccount);

  return (
    <main className="dashboard">
      <div className="dashboard__header">
        <h4>Welcome back, {userProfile?.result?.firstName} </h4>
        <span>Kes {userAccount.currentBalance} /=</span>
      </div>

      <div className="dashboard__main">
        <Transactions />

        <div className="dashboard__forms">
          <DepositForm />
          <WithdrawForm />
          <TransferForm />
          <LoanForm />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
