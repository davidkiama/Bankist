import React from "react";
import { TextField } from "@material-ui/core";

function Signin() {
  return (
    <div className="box">
      <h4 className="heading-4 box__heading">Signin</h4>
      <form className="form auth__form">
        <TextField name="firstName" label="First Name" />
      </form>
    </div>
  );
}

export default Signin;
