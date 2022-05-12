import React, { useState } from "react";
import { Grid, Avatar } from "@mui/material/";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch } from "react-redux";

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

  const dispatch = useDispatch();

  const switchPage = () => {
    setPage1((page1) => !page1);
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const clearInputs = () => setUserData(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp(userData));
    clearInputs();
  };

  return (
    <div className="box">
      <Avatar className="box__avatar">
        <LockOutlinedIcon />
      </Avatar>
      <h4 className="heading-4 box__heading">Signup</h4>

      <form className="form auth__form" onSubmit={handleSubmit}>
        <Grid container spacing={2} className={`form--page  page1 ${page1 && "active-form "}`}>
          <Input name="firstName" label="First Name" half autoFocus handleChange={handleChange} />
          <Input name="lastName" label="Last Name" half handleChange={handleChange} />

          <Input name="password" label="Password" handleChange={handleChange} />
          <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} />

          <span className="btn form__btn witch switch--next" onClick={switchPage}>
            Next &raquo;
          </span>
        </Grid>

        <Grid container spacing={2} className={`form--page page2 ${!page1 && "active-form "}`}>
          <Input name="email" label="Email" handleChange={handleChange} />
          <Input name="telephone" label="Telephone" handleChange={handleChange} />
          <Input name="idNumber" label="Id Number" handleChange={handleChange} />

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
