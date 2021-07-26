import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { numberWithCommas } from "../utils/format";
import EditTransaction from "./EditTransaction";

const Transaction = ({ transaction }) => {
  const [showEdit, setShowEdit] = useState(false);
  const sign = transaction.amount > 0 ? "+" : "-";
  const { deleteTransaction } = useContext(GlobalContext);
  return (
    <div>
      <li className={sign === "-" ? "minus" : "plus"}>
        {transaction.text}
        <span>
          {sign}${numberWithCommas(Math.abs(transaction.amount))}
          <button
            className="edit-icon"
            onClick={() => setShowEdit((showEdit) => !showEdit)}
          >
            <i className="far fa-edit"></i>
          </button>
        </span>
        <button
          className="delete-btn"
          onClick={(e) => deleteTransaction(transaction._id)}
        >
          <i className="far fa-trash-alt"></i>
        </button>
      </li>
      {showEdit && (
        <EditTransaction
          text={transaction.text}
          amount={transaction.amount}
          id={transaction._id}
        />
      )}
    </div>
  );
};

export default Transaction;
