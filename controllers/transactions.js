const Transaction = require("../models/Transaction");

// @desc Get all transactions
// @route GET /api/v1/transactions
// @access Public
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({});
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions, // array
    });
  } catch (error) {
    return res.send(500).json({
      success: false,
      error: "server error",
    });
  }
};

// @desc Add a transaction
// @route POST /api/v1/transactions
// @access Public
exports.addTransaction = async (req, res, next) => {
  try {
    const { text, amount } = req.body;
    // --------------------------------------------------
    // const transaction = new Transaction({
    //   text,
    //   amount,
    // });
    // await transaction.save();
    // --------------------------------------------------
    const transaction = await Transaction.create({
      text,
      amount,
    });
    return res.status(201).json({
      success: true,
      data: transaction, // object
    });
  } catch (error) {
    // console.log(error.errors);
    // console.log(error.message);
    // The Object.values() method returns an array of a given object's own enumerable property values
    // console.log(Object.values(error.errors));
    // console.log(Object.values(error.errors)[0].message);
    if (error.name === "ValidationError") {
      // we have use map here since there could be multiple errors
      const messages = Object.values(error.errors).map((ele) => ele.message);
      return res.status(400).json({
        success: false,
        error: messages, // array
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "server error",
      });
    }
  }
};

// @desc Delete transaction
// @route DELETE /api/v1/transactions/:id
// @access Public
exports.deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "No transaction found",
      });
    }
    await Transaction.deleteOne({ _id: transaction.id });
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "server error",
    });
  }
};

// @desc Edit transaction
// @route PATCH /api/v1/transactions/:id
// @access Public
exports.editTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "No transaction found",
      });
    }

    return res.status(200).json({
      success: true,
      data: transaction, // object
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((ele) => ele.message);
      return res.status(400).json({
        success: false,
        error: messages, // array
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "server error",
      });
    }
  }
};
