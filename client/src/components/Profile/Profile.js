import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//custom components

import { profile } from "../../actions/utilities";

import "./Profile.css";
function Profile({ onAddStatusCode, onAddMessage }) {
  const [userProfile, setUserProfile] = useState(JSON.parse(localStorage.getItem("profile")));

  const currentBalance = useSelector((state) => state.userAccount.currentBalance);

  const transactions = useSelector((state) => state.userAccount.transactions);
  const transactionsCount = transactions.length;
  const dispatch = useDispatch();

  dispatch(profile());

  const addStatusCode = (status) => {
    onAddStatusCode(status);
  };

  return (
    <main className="profile">
      <div className="profile__container">
        <div className="profile__slide">
          <img src="/svg/profile.svg" alt="Fullname" />
          <h4>Full name : {userProfile?.fullName} </h4>
        </div>

        <div className="profile__slide">
          <img src="/svg/message.svg" alt="Email" />
          <h4>Email : {userProfile?.email} </h4>
        </div>

        <div className="profile__slide">
          <img src="/svg/dollar.svg" alt="Balance" />
          <h4> Current balance : {currentBalance} /=</h4>
        </div>

        <div className="profile__slide">
          <img src="/svg/transactions.svg" alt="Transaction" />
          <h4> Transactions : {transactionsCount} </h4>
        </div>
      </div>
    </main>
  );
}

export default Profile;
