const express = require("express");
const router = express.Router();
const {
  getTransactions,
  addTransaction,
  deleteTransaction,
  editTransaction,
} = require("../controllers/transactions");

// https://www.geeksforgeeks.org/express-js-router-route-function/
// Router.route() can use for chainable routes.
// Meaning: You have one API for all the METHODS, you can write that in .route().

// router.get("/", getTransactions);

router.route("/").get(getTransactions).post(addTransaction);

router.route("/:id").delete(deleteTransaction).patch(editTransaction);

module.exports = router;
