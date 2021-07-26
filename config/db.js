const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://127.0.0.1/expense-tracker",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    );
    console.log("MongoDB connected!!");
  } catch (error) {
    console.log("connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
