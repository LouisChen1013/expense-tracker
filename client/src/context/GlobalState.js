import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// test
// const initialState = {
//   transactions: [
//     { id: 1, text: "Flower", amount: -20 },
//     { id: 2, text: "Salary", amount: 300 },
//     { id: 3, text: "Book", amount: -10 },
//     { id: 4, text: "Camera", amount: 150 },
//   ],
// };

const initialState = {
  transactions: [],
  error: null,
  loading: true,
};

export const GlobalContext = createContext(initialState);

// children will be all the components that wrapped inside GlobalProvider
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState); // our initialState is now in the global state
  // Actions

  async function getTransactions() {
    try {
      const res = await axios.get("/api/v1/transaction");
      // console.log(res);
      dispatch({
        type: "GET_TRANSACTION",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/v1/transaction/${id}`);
      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  }

  async function addTransaction(transaction) {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    try {
      // axios.post(url[, data[, config]])
      const res = await axios.post("/api/v1/transaction", transaction, config);
      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data.data,
      });
    } catch (error) {
      // https://github.com/axios/axios#handling-errors
      // console.log(error.response);
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error, // this will be in an array as we set in the backend controller
      });
    }
  }

  async function editTransaction(id, transaction) {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    try {
      // axios.patch(url[, data[, config]])
      const res = await axios.patch(
        `/api/v1/transaction/${id}`,
        transaction,
        config
      );
      dispatch({
        type: "EDIT_TRANSACTION",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        deleteTransaction,
        addTransaction,
        getTransactions,
        editTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
