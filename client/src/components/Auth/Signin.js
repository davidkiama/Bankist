import React, { useState } from "react";
import { Grid, Avatar } from "@mui/material/";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch } from "react-redux";

import Input from "./Input";
import "./Auth.css";
import { signIn } from "../../actions/auth";

const initialState = { email: "", idNumber: "", password: "" };
function Signin() {
  const [userData, setUserData] = useState(initialState);
  const [statusCode, setStatusCode] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  const dispatch = useDispatch();

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

    clearInputs();
  };

  return (
    <div className="box">
      <Avatar className="box__avatar">
        <LockOutlinedIcon />
      </Avatar>
      <h4 className="heading-4 box__heading">Signin</h4>

      <span className={`${statusCode[0] == "2" ? "ok" : "error"} status-msg`}>Successfully </span>

      <form className="form auth__form" onSubmit={handleSubmit}>
        <Grid container spacing={2} className="form--page  page1  active-form ">
          <Input name="email" label="Email" autoFocus handleChange={handleChange} />
          <Input name="idNumber" label="Id Number" handleChange={handleChange} />
          <Input name="password" label="Password" handleChange={handleChange} />

          <button type="submit" className="btn form__btn">
            Signin
          </button>
        </Grid>
      </form>
    </div>
  );
}

export default Signin;
