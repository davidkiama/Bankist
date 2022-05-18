import * as api from "../api";

export const deposit = (amount) => async (dispatch) => {
  try {
    const { data } = await api.deposit(amount);

    dispatch({ type: "TRANSACT", data });

    console.log(data);
  } catch (error) {
    console.log("**********************************************");
    console.log(error);
  }
};

export const withdraw = (amount) => async (dispatch) => {
  try {
    const { data } = await api.withdraw(amount);

    dispatch({ type: "TRANSACT", data });
  } catch (error) {
    console.log("**********************************************");
    console.log(error);
  }
};

export const transfer = (body) => async (dispatch) => {
  try {
    const { data } = await api.transfer(body);

    dispatch({ type: "TRANSACT", data });
  } catch (error) {
    console.log("**********************************************");
    console.log(error);
  }
};

export const loan = (amount) => async (dispatch) => {
  try {
    const { data } = await api.loan(amount);

    dispatch({ type: "TRANSACT", data });
  } catch (error) {
    console.log(error);
  }
};

export const dashboard = () => async (dispatch) => {
  try {
    const { data } = await api.dashboardInfo();

    // update userAccount state when one logs in
    dispatch({ type: "TRANSACT", data });
  } catch (error) {
    console.log("**********************************************");
    console.log(error);
  }
};
