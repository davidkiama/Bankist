import * as api from "../api";

export const deposit = (amount) => async (dispatch) => {
  try {
    const { status, data } = await api.deposit(amount);

    dispatch({ type: "TRANSACT", data });

    return { status, message: data.message };
  } catch (error) {
    console.log("**********************************************");
    console.log(error);
  }
};

export const withdraw = (amount) => async (dispatch) => {
  try {
    const { status, data } = await api.withdraw(amount);

    dispatch({ type: "TRANSACT", data });
    return { status, message: data.message };
  } catch (error) {
    const { status, data } = await error.response;
    return { status, message: data.message };
  }
};

export const transfer = (body) => async (dispatch) => {
  try {
    const { status, data } = await api.transfer(body);

    dispatch({ type: "TRANSACT", data });
    return { status, message: data.message };
  } catch (error) {
    console.log("**********************************************");
    console.log(error);
  }
};

export const loan = (amount) => async (dispatch) => {
  try {
    const { status, data } = await api.loan(amount);

    dispatch({ type: "TRANSACT", data });
    return { status, message: data.message };
  } catch (error) {
    const { status, data } = await error.response;
    return { status, message: data.message };
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
