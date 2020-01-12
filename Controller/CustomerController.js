const express = require("express");
const { Customer } = require("../Models/Customer");

const router = express.Router();

router.use(express.json());

let ObjectId = require("mongoose").Types.ObjectId;

router.get("/test", (req, resp) => {
  resp.send("hello world from customer...");
});

router.get("/test/:id", (req, resp) => {
  resp.send(`hello world from customer id ${req.params.id}`);
});

//GET http://localhost:3000/customers
router.get("/", (req, resp) => {
  Customer.find((err, docs) => {
    if (err)
      console.log(
        "Error while getting customers..." + JSON.stringify(err, undefined, 2)
      );
    else resp.send(docs);
  });
});

//GET http://localhost:3000/customers/id
router.get("/:id", (req, resp) => {
  let customerId = req.params.id;
  if (!ObjectId.isValid(customerId))
    return resp.status(400).send(`Customer not found for id :${customerId}`);

  Customer.findById(customerId, (err, docs) => {
    if (err)
      console.log(
        "Error while getting customers..." + JSON.stringify(err, undefined, 2)
      );
    else resp.send(docs);
  });
});

//PUT http://localhost:3000/customers/id
router.put("/:id", (req, resp) => {
  let customerId = req.params.id;
  if (!ObjectId.isValid(customerId))
    return resp.status(400).send(`Customer not found for id :${customerId}`);

  let cust = new Customer({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    gender: req.body.gender,
    age: req.body.age,
    email: req.body.email
  });

  Customer.findByIdAndUpdate(
    customerId,
    { $set: cust },
    { new: true },
    (err, doc) => {
      if (err)
        console.log(
          "Error while uppdating customers..." +
            JSON.stringify(err, undefined, 2)
        );
      else resp.status(200).send(doc);
    }
  );
});

//POST http://localhost:3000/customers
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
