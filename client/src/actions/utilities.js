import * as api from "../api";

export const profile = () => async (dispatch) => {
  try {
    const { data } = await api.profile();

    // update userAccount state when one logs in
    dispatch({ type: "PROFILE", data });
  } catch (error) {
    console.log("********************************************** profile");
    console.log(error);
  }
};
