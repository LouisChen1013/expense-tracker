import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import Error from "./Error";

const EditTransaction = (props) => {
  const [text, setText] = useState(props.text);
  const [amount, setAmount] = useState(props.amount);
  const { editTransaction, error } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    const modifyTransaction = {
      text,
      amount: parseFloat(amount),
    };

    editTransaction(props.id, modifyTransaction);
  };

  return (
    <div>
      {error && <Error error={error} />}
      <form className="form" id="form" onSubmit={onSubmit}>
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
        <button className="btn">Edit transaction</button>
      </form>
    </div>
  );
};

export default EditTransaction;
