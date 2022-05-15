import React from "react";
import { TextField } from "@mui/material/";

function LoanForm() {
  return (
    <form className="form--trx">
      <h4 className="form__heading">Loan Application</h4>
      <TextField className="form__input" name="amount" label="Amount" variant="filled" type="number" />

      <button type="submit" className="btn">
        Apply
      </button>
    </form>
  );
}

export default LoanForm;
