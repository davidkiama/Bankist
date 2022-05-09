import React, { useState } from "react";
import { Grid, Avatar } from "@mui/material/";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import Input from "./Input";
import "./Auth.css";

function Signin() {
  const handleChange = () => {};
  return (
    <div className="box">
      <Avatar className="box__avatar">
        <LockOutlinedIcon />
      </Avatar>
      <h4 className="heading-4 box__heading">Signin</h4>

      <form className="form auth__form">
        <Grid container spacing={2} className="form--page  page1  active-form ">
          <Input name="email" label="Email" autoFocus handleChange={handleChange} />
          <Input name="IdNumber" label="Id Number" handleChange={handleChange} />
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
