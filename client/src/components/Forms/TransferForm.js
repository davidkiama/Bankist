import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField } from "@mui/material/";

import { transfer } from "../../actions/transactions";

const initialState = { amount: 0, email: "" };
function TransferForm() {
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();

  const clearInputs = () => {
    setFormData(initialState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(transfer(formData));
    clearInputs();
  };

  return (
    <form className="form--trx form--trx--transfer" onSubmit={handleSubmit}>
      <h4 className="form__heading">Transfer form</h4>
      <TextField
        className="form__input"
        name="email"
        label="Email"
        variant="filled"
        type="email"
        value={formData.email === 0 ? "" : formData.email}
        required
        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
      />
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
        Transfer
      </button>
    </form>
  );
}

export default TransferForm;
