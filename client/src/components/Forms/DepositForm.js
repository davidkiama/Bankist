import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField } from "@mui/material/";

import { deposit } from "../../actions/transactions";

import "./Forms.css";

const initialState = { amount: 0 };
function DepositForm({ onAddStatusCode, onAddMessage }) {
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();

  const clearInputs = () => setFormData(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { status, message } = await dispatch(deposit(formData));

    // updating the message string to be displayed
    onAddStatusCode(status);
    onAddMessage(message);

    clearInputs();
  };
  return (
    <form className="form--trx  form--trx--deposit" onSubmit={handleSubmit}>
      <h4 className="form__heading">Deposit form</h4>
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
        Deposit
      </button>
    </form>
  );
}

export default DepositForm;
