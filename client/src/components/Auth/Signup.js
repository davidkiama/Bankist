import React, { useState } from "react";
import { Avatar } from "@mui/material/";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Input from "./Input";
import "./Auth.css";
import { signUp } from "../../actions/auth";

const initialState = {
  fullName: "",
  password: "",
  email: "",
};

function Signup() {
  const [userData, setUserData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const [statusCode, setStatusCode] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const clearInputs = () => setUserData(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { status, message } = await dispatch(signUp(userData));

    // updating the message string to be displayed
    setStatusCode(status);
    setStatusMsg(message);

    clearInputs();
    setLoading(false);

    if (status === 200) {
      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    }
  };

  return (
    <div className="box">
      <Avatar className="box__avatar">
        <LockOutlinedIcon />
      </Avatar>
      <h4 className="heading-4 box__heading">Signup</h4>

      {statusMsg ? (
        <span
          className={`
          ${statusCode === 200 && "status--ok"}  
          ${statusCode !== 200 && "status--error"} status-msg`}
        >
          {statusMsg}
        </span>
      ) : null}

      <div className="box__main">
        {loading ? (
          <CircularProgress />
        ) : (
          <form className="form auth__form" onSubmit={handleSubmit}>
            <Input
              name="fullName"
              type="text"
              value={userData.fullName}
              label="Full Name"
              autoFocus
              handleChange={handleChange}
            />
            <Input
              name="email"
              type="email"
              label="Email"
              value={userData.email}
              handleChange={handleChange}
            />
            <Input
              name="password"
              type="password"
              label="Password"
              value={userData.password}
              handleChange={handleChange}
            />

            <button type="submit" className="btn form__btn">
              Signup
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Signup;
