import React, { useState } from "react";
import { Grid, Avatar } from "@mui/material/";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Input from "./Input";
import "./Auth.css";
import { signIn } from "../../actions/auth";

const initialState = { email: "", idNumber: "", password: "" };
function Signin() {
  const [userData, setUserData] = useState(initialState);
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
    const { status, message } = await dispatch(signIn(userData));

    // updating the message string to be displayed
    setStatusCode(status);
    setStatusMsg(message);

    if (status === 200) navigate("/dashboard");

    clearInputs();
  };

  return (
    <div className="box">
      <Avatar className="box__avatar">
        <LockOutlinedIcon />
      </Avatar>
      <h4 className="heading-4 box__heading">Signin</h4>

      {statusMsg ? (
        <span
          className={`
          ${statusCode === 200 && "status--ok"}  
          ${statusCode !== 200 && "status--error"} status-msg`}
        >
          {statusMsg}
        </span>
      ) : null}

      <form className="form auth__form" onSubmit={handleSubmit}>
        <Grid container spacing={2} className="form--page  page1  active-form ">
          <Input name="email" type="email" label="Email" autoFocus handleChange={handleChange} />
          <Input name="idNumber" type="text" label="Id Number" handleChange={handleChange} />
          <Input name="password" type="password" label="Password" handleChange={handleChange} />

          <button type="submit" className="btn form__btn">
            Signin
          </button>
        </Grid>
      </form>
    </div>
  );
}

export default Signin;

// Documentation
/*
When one signs up we return the status code and message

If the status code is 200, 201 or essentially starts with 2 then
the request was successful. If so we display the message with a green background

If the status code does not start with 2, then the request was unsuccessfull.
So we will display the message with a red background



*/
