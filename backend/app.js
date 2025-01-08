require("dotenv").config();
require("./db");
require("express-async-errors");

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const userRouter = require("./routes/user");
const { errorHandler } = require("./middlewares/error");
const { notFoundError } = require("./utils/helper");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: process.env.CLIENT_URL }));

app.use("/api/user", userRouter);
app.use("/*", notFoundError);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`The server listening on port: ${process.env.PORT}`);
});
