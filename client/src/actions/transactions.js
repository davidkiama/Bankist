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

export const withdraw = (amount) => async (dispatch) => {
  try {
    const { data } = await api.withdraw(amount);

    console.log(data);
  } catch (error) {
    console.log("**********************************************");
    console.log(error);
  }
};

export const transfer = (body) => async (dispatch) => {
  try {
    const { data } = await api.transfer(body);

    console.log(data);
  } catch (error) {
    console.log("**********************************************");
    console.log(error);
  }
};
