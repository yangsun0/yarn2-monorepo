import express = require("express");
import morgan = require("morgan");
import cors = require("cors");
import { MyData } from "common";

const app = express();
if (process.env["NODE_ENV"] !== "test") {
  app.use(morgan("combined"));
}

app.use(cors());

let counter = 0;
app.get("/api/mydata", (req, res) => {
  counter += 1;
  const myData = new MyData();
  myData.text += " " + counter;
  res.send(myData);
});

export default app;
