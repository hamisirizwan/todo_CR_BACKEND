const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT;
const todoRouter = require("./routes/todoRoute");
var cors = require("cors");

app.listen(port, () => console.log(`server started at port:${port}`));

// app.get("", (req, res) => {
//   res.send("<h1>YOU CAN RECALL</h1>");
// });

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected successfully"))
  .catch((err) => console.log(err.message));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", todoRouter);
