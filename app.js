const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const app = express();
// const cors = require("cors");
const transactions = require("./routes/transactions");
const connectDB = require("./config/db");

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.join(__dirname, "config/.env") });
}

connectDB();

// https://www.npmjs.com/package/cors
// enable cors on the server side or add "proxy": "http://localhost:5000" in the package.json of the client side
// const corsOptions = {
//   origin: "http://localhost:3000",
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// app.use(cors(corsOptions));
app.use(morgan("tiny"));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // It parses incoming requests with urlencoded payloads and is based on body-parser.

app.use("/api/v1/transaction", transactions);

// set the static folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  // when we make a request to anything (except our api route above, /api/v1/transaction), it's going to load the index.html in the client/bulid directory
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
