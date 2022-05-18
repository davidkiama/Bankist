import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//custom components

import Transactions from "../Transactions/Transactions";
import DepositForm from "../Forms/DepositForm";
import LoanForm from "../Forms/LoanForm";
import TransferForm from "../Forms/TransferForm";
import WithdrawForm from "../Forms/WithdrawForm";

import { dashboard } from "../../actions/transactions";

import "./Dashboard.css";
function Dashboard() {
  const [userProfile, setUserProfile] = useState(JSON.parse(localStorage.getItem("profile")));

  const currentBalance = useSelector((state) => state.userAccount.currentBalance);

  const dispatch = useDispatch();

  dispatch(dashboard());

  return (
    <main className="dashboard">
      <div className="dashboard__header">
        <h4>Welcome back, {userProfile?.result?.firstName} </h4>
        <span>Kes {currentBalance} /=</span>
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
