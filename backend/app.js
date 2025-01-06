require("dotenv").config();
require("./db");

const express = require("express");
const morgan = require("morgan");

const userRouter = require("./routes/user");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`The server listening on port: ${process.env.PORT}`);
});
