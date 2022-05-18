export default (userAccount = { currentBalance: 0, transactions: [] }, action) => {
  switch (action.type) {
    case "TRANSACT":
      return {
        ...userAccount,
        currentBalance: action.data.currentBalance,
        transactions: action.data.transactions,
      };

    default:
      return userAccount;
  }
};
