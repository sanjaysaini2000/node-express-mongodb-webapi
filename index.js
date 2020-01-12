/**
 * for express server
 */
const bodyParser = require("body-parser");
const { mongoose } = require("./db.js");
const customer = require("./Controller/CustomerController");

const express = require("express");
const app = express();

app.use(bodyParser.json());
const port = process.env.port || 3000;
app.use("/customers", customer);

app.listen(port, () => {
  console.log(`server listening at port :${port}`);
});

app.get("/", (req, resp) => {
  resp.send("hello world...");
});
