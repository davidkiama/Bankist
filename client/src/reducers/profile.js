export default (userState = { authData: null }, action) => {
  switch (action.type) {
    case "PROFILE":
      //   localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...userState, authData: action.data };

    default:
      return userState;
  }
};
