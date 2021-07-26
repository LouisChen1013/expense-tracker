const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "text is required"],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, "negative/postive number is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
