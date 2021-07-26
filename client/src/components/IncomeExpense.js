import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { numberWithCommas } from "../utils/format";

const IncomeExpense = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map((transaction) => transaction.amount);
  // console.log(amounts);

  const income = amounts
    .filter((amount) => amount > 0)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2);

  const expense = amounts
    .filter((amount) => amount < 0)
    .reduce((arr, curr) => arr + curr, 0)
    .toFixed(2);

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p id="money-plus" className="money plus">
          ${numberWithCommas(income)}
        </p>
      </div>
      <div>
        <h4>Expense</h4>
        <p id="money-minus" className="money minus">
          ${numberWithCommas(Math.abs(expense))}
        </p>
      </div>
    </div>
  );
};

export default IncomeExpense;
