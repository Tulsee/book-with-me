const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Rental = require("./models/rental");
const Fakedb = require("./fake-db");
const app = express();

//import routes
const rentalRoutes = require("./routes/rentals");
const userRoutes = require("./routes/users");

//db config
const db = require("./config/dev");

//connection to database
mongoose
  .connect(db.mongoDBURI, {
    useNewUrlParser: true
  })
  .then(() => {
    const fakedb = new Fakedb();
    fakedb.seedDb();
    console.log("MongoDB connected...");
  })
  .catch(err => console.log(err));

//Middleware for bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//use routes
app.use("/api/v1/rentals", rentalRoutes);
app.use("/api/v1/users", userRoutes);

// app.get("/rentals", (req, res) => {
//   res.json({
//     success: true
//   });
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});

module.exports = app;
