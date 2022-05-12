export default (userState = { authData: null }, action) => {
  switch (action.type) {
    case "SIGNUP":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...userState, authData: action.data };

    case "SIGNIN":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...userState, authData: action.data };

    default:
      return userState;
  }
};
