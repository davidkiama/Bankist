import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//custom components

import { profile } from "../../actions/utilities";

import "./Profile.css";
function Profile({ onAddStatusCode, onAddMessage }) {
  const [userProfile, setUserProfile] = useState(JSON.parse(localStorage.getItem("profile")));

  const currentBalance = useSelector((state) => state.userAccount.currentBalance);

  const dispatch = useDispatch();

  dispatch(profile());

  const addStatusCode = (status) => {
    onAddStatusCode(status);
  };

  return (
    <main className="profile">
      <div className="profile__header">
        <h4>Full name : {userProfile?.fullName} </h4>
        <h4>Email : {userProfile?.email} </h4>
        <span>Current balance : {currentBalance} /=</span>
      </div>
    </main>
  );
}

export default Profile;
