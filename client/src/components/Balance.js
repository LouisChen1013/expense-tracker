import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { numberWithCommas } from "../utils/format";
import AddTransaction from "./AddTransaction";

const Balance = () => {
  const { transactions } = useContext(GlobalContext);
  const amount = transactions.map((transaction) => transaction.amount);
  const total = amount.reduce((acc, curr) => acc + curr, 0).toFixed(2);

  const [showAdd, setShowAdd] = useState(false);

  return (
    <div>
      <div className="balance">
        <h2>Balance: ${numberWithCommas(total)}</h2>
        <button className="add-btn" onClick={() => setShowAdd((show) => !show)}>
          {showAdd ? "CANCEL" : "ADD"}
        </button>{" "}
      </div>
      {showAdd && <AddTransaction />}
    </div>
  );
};

export default Balance;
