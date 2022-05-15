import * as api from "../api";

export const deposit = (amount) => async (dispatch) => {
  try {
    const data = await api.deposit(amount);

    console.log(data);
  } catch (error) {
    console.log("**********************************************");
    console.log(error);
  }
};
