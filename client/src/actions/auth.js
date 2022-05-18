import * as api from "../api";

export const signUp = (user) => async (dispatch) => {
  try {
    const { data } = await api.signUp(user);

    dispatch({ type: "SIGNUP", data });
    return { status: 200, message: "Account created successfully" };
  } catch (error) {
    const { status, data } = await error.response;
    return { status: status, message: data.message };
  }
};

export const signIn = (user) => async (dispatch) => {
  try {
    const { data } = await api.signIn(user);

    dispatch({ type: "SIGNIN", data });

    // update userAccount state when one logs in
    dispatch({
      type: "LOGIN_STATE",
      data: { currentBalance: data.result.currentBalance, transactions: data.result.transactions },
    });

    return { status: 200, message: "Logged in successfully." };
  } catch (error) {
    const { status, data } = await error.response;
    return { status: status, message: data.message };
  }
};
