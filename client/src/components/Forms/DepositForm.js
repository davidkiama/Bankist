import React from "react";

import { TextField } from "@mui/material/";

import "./Forms.css";

function DepositForm() {
  return (
    <form className="form">
      <h4 className="form__heading">Deposit form</h4>
      <TextField className="form__input" name="amount" label="Amount" variant="filled" type="number" />

      <button type="submit" className="btn">
        Deposit
      </button>
    </form>
  );
}

export default DepositForm;
