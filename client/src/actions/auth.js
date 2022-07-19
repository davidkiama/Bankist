import * as api from "../api";

export const signUp = (user) => async (dispatch) => {
  try {
    const { status, data } = await api.signUp(user);

    dispatch({ type: "SIGNUP", data });
    return { status, message: data.message };
  } catch (error) {
    const { status, data } = await error.response;
    return { status, message: data.message };
  }
};

export const signIn = (user) => async (dispatch) => {
  try {
    const { status, data } = await api.signIn(user);

    dispatch({ type: "SIGNIN", data });

    return { status, message: data.message };
  } catch (error) {
    const { status, data } = await error.response;
    return { status, message: data.message };
  }
};
