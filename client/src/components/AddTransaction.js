import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import Error from "./Error";

const AddTransaction = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const { addTransaction, error, transactions } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: parseFloat(amount),
    };
    addTransaction(newTransaction);
  };

  useEffect(() => {
    if (!error) {
      setText("");
      setAmount("");
    }
  }, [error, transactions]);

  return (
    <div>
      {error && <Error error={error} />}
      <form className="form" onSubmit={onSubmit}>
        <div className="form-control">
          <input
            type="text"
            id="text"
            value={text}
            placeholder="Description"
            autoComplete="off"
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-control">
          <input
            type="number"
            id="amount"
            value={amount}
            placeholder="Amount (negative - expense, positive - income)"
            autoComplete="off"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;
