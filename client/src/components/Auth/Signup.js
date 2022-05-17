import React, { useState } from "react";
import { Grid, Avatar } from "@mui/material/";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Input from "./Input";
import "./Auth.css";
import { signUp } from "../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
  email: "",
  telephone: "",
  idNumber: "",
};

function Signup() {
  const [page1, setPage1] = useState(true);
  const [userData, setUserData] = useState(initialState);

  const [statusCode, setStatusCode] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const switchPage = () => {
    setPage1((page1) => !page1);
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const clearInputs = () => setUserData(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { status, message } = await dispatch(signUp(userData));

    // updating the message string to be displayed
    setStatusCode(status);
    setStatusMsg(message);

    if (status === 200) navigate("/signin");

    clearInputs();
  };

  return (
    <div className="box">
      <Avatar className="box__avatar">
        <LockOutlinedIcon />
      </Avatar>
      <h4 className="heading-4 box__heading">Signup</h4>

      {/* check if status code is ok and display a msg in green */}

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
        <Grid container spacing={2} className={`form--page  page1 ${page1 && "active-form "}`}>
          <Input name="firstName" type="text" label="First Name" half autoFocus handleChange={handleChange} />
          <Input name="lastName" type="text" label="Last Name" half handleChange={handleChange} />

          <Input name="password" type="password" label="Password" handleChange={handleChange} />
          <Input
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            handleChange={handleChange}
          />

          <span className="btn form__btn witch switch--next" onClick={switchPage}>
            Next &raquo;
          </span>
        </Grid>

        <Grid container spacing={2} className={`form--page page2 ${!page1 && "active-form "}`}>
          <Input name="email" type="email" label="Email" handleChange={handleChange} />
          <Input name="telephone" type="text" label="Telephone" handleChange={handleChange} />
          <Input name="idNumber" type="text" label="Id Number" handleChange={handleChange} />

          <button type="submit" className="btn form__btn">
            Signup
          </button>

          <span className=" switch switch--prev" onClick={switchPage}>
            {" "}
            &laquo; Prev
          </span>
        </Grid>
      </form>
    </div>
  );
}

export default Signup;
