import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField } from "@mui/material/";

import { withdraw } from "../../actions/transactions";

const initialState = { amount: 0 };
function WithdrawForm() {
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(withdraw(formData));

    clearInputs();
  };

  const clearInputs = () => {
    setFormData(initialState);
  };

  return (
    <form className="form--trx form--trx--withdraw" onSubmit={handleSubmit}>
      <h4 className="form__heading">Withdraw form</h4>
      <TextField
        className="form__input"
        name="amount"
        label="Amount"
        variant="filled"
        type="number"
        value={formData.amount === 0 ? "" : formData.amount}
        required
        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
      />

      <button type="submit" className="btn">
        Withdraw
      </button>
    </form>
  );
}

export default WithdrawForm;
