export default (userState = { authData: null }, action) => {
  switch (action.type) {
    case "SIGNUP":
      localStorage.setItem(
        "profile",
        JSON.stringify({
          fullName: action?.data?.result.fullName,
          email: action?.data?.result.email,
          currentBalance: action?.data?.result.currentBalance,
          transactions: action?.data?.result.transactions,
          token: action?.data?.token,
        })
      );
      return { ...userState, authData: action.data };

    case "SIGNIN":
      localStorage.setItem(
        "profile",
        JSON.stringify({
          fullName: action?.data?.result.fullName,
          email: action?.data?.result.email,
          currentBalance: action?.data?.result.currentBalance,
          transactions: action?.data?.result.transactions,
          token: action?.data?.token,
        })
      );
      return { ...userState, authData: action.data };

    case "LOGOUT":
      localStorage.clear();
      return { ...userState, authData: null };
    default:
      return userState;
  }
};

// export default (userState = { authData: null }, action) => {
//   switch (action.type) {
//     case "SIGNUP":
//       localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
//       return { ...userState, authData: action.data };

//     case "SIGNIN":
//       // console.log("sinin information", ...action?.data);
//       localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
//       return { ...userState, authData: action.data };

//     case "LOGOUT":
//       localStorage.clear();
//       return { ...userState, authData: null };
//     default:
//       return userState;
//   }
// };
