export default (userAccount = { currentBalance: 0, transactions: [] }, action) => {
  switch (action.type) {
    case "DEPOSIT":
      return {
        ...userAccount,
        currentBalance: action.data.currentBalance,
        transactions: action.data.transactions,
      };

    case "DASHBOARD":
      return {
        ...userAccount,
        currentBalance: action.data.currentBalance,
        transactions: action.data.transactions,
      };
    default:
      return userAccount;
  }
};
