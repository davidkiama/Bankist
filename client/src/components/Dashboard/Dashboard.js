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
function Dashboard({ onAddStatusCode, onAddMessage }) {
  const [userProfile, setUserProfile] = useState(JSON.parse(localStorage.getItem("profile")));

  const currentBalance = useSelector((state) => state.userAccount.currentBalance);

  const dispatch = useDispatch();

  dispatch(dashboard());

  const addStatusCode = (status) => {
    onAddStatusCode(status);
  };
  const addMessage = (message) => {
    onAddMessage(message);
  };

  return (
    <main className="dashboard">
      <div className="dashboard__header">
        <h4>Welcome back, {userProfile?.fullName} </h4>
        <span>Kes {currentBalance} /=</span>
      </div>

      <div className="dashboard__main">
        <Transactions />

        <div className="dashboard__forms">
          <DepositForm onAddStatusCode={addStatusCode} onAddMessage={addMessage} />
          <WithdrawForm onAddStatusCode={addStatusCode} onAddMessage={addMessage} />
          <TransferForm onAddStatusCode={addStatusCode} onAddMessage={addMessage} />
          <LoanForm onAddStatusCode={addStatusCode} onAddMessage={addMessage} />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
