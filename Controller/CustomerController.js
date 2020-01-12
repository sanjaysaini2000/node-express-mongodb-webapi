const express = require("express");
const { Customer } = require("../Models/Customer");

const router = express.Router();

router.use(express.json());

router.get("/test", (req, resp) => {
  resp.send("hello world from customer...");
});

router.get("/test/:id", (req, resp) => {
  resp.send(`hello world from customer id ${req.params.id}`);
});

router.get("/", (req, resp) => {
  Customer.find((err, docs) => {
    if (err)
      console.log(
        "error in getting customers..." + JSON.stringify(err, undefined, 2)
      );
    else resp.send(docs);
  });
});

router.post("/", (req, resp) => {
  let cust = new Customer({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    gender: req.body.gender,
    age: req.body.age,
    email: req.body.email
  });
  cust.save((err, doc) => {
    if (err)
      console.log(
        "error in saving customers..." + JSON.stringify(err, undefined, 2)
      );
    else resp.send(doc);
  });
});

module.exports = router;
