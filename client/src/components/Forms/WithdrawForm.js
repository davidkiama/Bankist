import React from "react";
import { TextField } from "@mui/material/";

function WithdrawForm() {
  return (
    <form className="form">
      <h4 className="form__heading">Withdraw form</h4>
      <TextField className="form__input" name="amount" label="Amount" variant="filled" type="number" />

      <button type="submit" className="btn">
        Withdraw
      </button>
    </form>
  );
}

export default WithdrawForm;
