const AppReducer = (state, action) => {
  // console.log(state, action); // where state contains our data, and action contains type and payload
  switch (action.type) {
    case "GET_TRANSACTION":
      return {
        ...state,
        loading: false,
        transactions: action.payload,
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction._id !== action.payload
        ),
        loading: false,
        error: null,
      };
    case "ADD_TRANSACTION":
      return {
        ...state,
        // .push modifies the array and returns the lengh of the array
        // transactions: state.transactions.push(action.payload),
        // transactions: state.transactions.concat(action.payload),
        transactions: [...state.transactions, action.payload],
        loading: false,
        error: null,
      };
    case "EDIT_TRANSACTION":
      const updatedTransactions = state.transactions.map((transaction) => {
        if (transaction._id === action.payload._id) {
          return { ...transaction, ...action.payload };
        }
        return transaction;
      });
      return {
        ...state,
        transactions: updatedTransactions,
        loading: false,
        error: null,
      };
    case "TRANSACTION_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default AppReducer;
