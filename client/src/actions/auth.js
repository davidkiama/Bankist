import * as api from "../api";

export const signUp = (user) => async (dispatch) => {
  try {
    const { data } = await api.signUp(user);

    dispatch({ type: "SIGNUP", data });
  } catch (error) {
    console.log("***************************************");
    console.log(error);
  }
};

export const signIn = (user) => async (dispatch) => {
  try {
    const { data } = await api.signIn(user);

    dispatch({ type: "SIGNIN", data });
  } catch (error) {
    console.log("***************************************");
    console.log(error);
  }
};
