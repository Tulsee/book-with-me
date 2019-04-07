const express = require("express");
const router = express.Router();
const Rental = require("../models/rental");

router.get("", (req, res) => {
  Rental.find({}, (err, foundRentals) => {
    res.json(foundRentals);
  });
});

router.get("/:id", (req, res) => {
  const rentalId = req.params.id;
  Rental.findById(rentalId, (err, found) => {
    if (err) {
      res.status(422).send({
        errors: [{ title: "Rental Error", detail: "could not found Rental" }]
      });
    }
    res.json(found);
  });
});

module.exports = router;
