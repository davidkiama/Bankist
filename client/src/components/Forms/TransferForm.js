import React from "react";
import { TextField } from "@mui/material/";

function TransferForm() {
  return (
    <form className="form">
      <h4 className="form__heading">Transfer form</h4>
      <TextField className="form__input" name="email" label="Email" variant="filled" type="email" />
      <TextField className="form__input" name="amount" label="Amount" variant="filled" type="number" />

      <button type="submit" className="btn">
        Transfer
      </button>
    </form>
  );
}

export default TransferForm;
