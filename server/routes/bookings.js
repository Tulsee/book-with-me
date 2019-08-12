const express = require("express");
const router = express.Router();


//import authorization
const userAuth = require("../controllers/user").authMiddleware;
const BookingCtrl = require('../controllers/booking');

router.post("", userAuth, BookingCtrl.createBooking);


module.exports = router;
 