export default (userState = { authData: null }, action) => {
  switch (action.type) {
    case "PROFILE":
      return { ...userState, authData: action.data };

    default:
      return userState;
  }
};
