const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const {port} = require('./src/configs')

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/public", express.static("public"));
app.use("/user", express.static("src/assets/user"));
app.use("/banner", express.static("src/assets/banner"));


app.use("/auth", require("./src/routes/auth"));
app.use("/transaction", require("./src/routes/transaction"));
app.use("/profile", require("./src/routes/profile"));
app.use("/user", require("./src/routes/user"));
app.use("/transaction_type", require("./src/routes/transactionType"));
app.use("/promo", require("./src/routes/promo"));

app.listen(port, console.log(`This server is running on port ${port}`), (err) => {
  if (err) {
    throw err;
  }
});
