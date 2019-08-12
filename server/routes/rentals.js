const express = require("express");
const router = express.Router();
const Rental = require("../models/rental");

//import authorization
const userAuth = require("../controllers/user").authMiddleware;

router.get("/secret", userAuth, (req, res) => {
  res.json({
    secret: true
  });
});

router.get("", (req, res) => {
  Rental.find({})
    .select('-bookings')
    .exec(function (err, foundRentals) {
      res.json(foundRentals);
    });
});
router.get("/:id", (req, res) => {
  const rentalId = req.params.id;

  Rental.findById(rentalId)
    .populate('user', 'username -_id')
    .populate('bookings', 'startAt endAt -_id')
    .exec(function (err, foundRental) {
      if (err) {
        return res.status(422).send({
          errors: [{
            title: "Rental Error",
            detail: "could not found Rental"
          }]
        });
      }
      return res.json(foundRental);
    });
});

module.exports = router;
