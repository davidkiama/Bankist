import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField } from "@mui/material/";

import { loan } from "../../actions/transactions";

const initialState = { amount: 0 };
function LoanForm() {
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();

  const clearInputs = () => {
    setFormData(initialState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loan(formData));

    clearInputs();
  };

  return (
    <form className="form--trx" onSubmit={handleSubmit}>
      <h4 className="form__heading">Loan Application</h4>
      <TextField
        className="form__input"
        name="amount"
        label="Amount"
        variant="filled"
        type="number"
        value={formData.amount === 0 ? "" : formData.amount}
        required
        onChange={(e) => setFormData({ ...formData, [e.target.name]: Number(e.target.value) })}
      />

      <button type="submit" className="btn">
        Apply
      </button>
    </form>
  );
}

export default LoanForm;
