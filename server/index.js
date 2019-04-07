const express = require("express");
const mongoose = require("mongoose");
const Rental = require("./models/rental");
const Fakedb = require("./fake-db");
const app = express();

//import routes
const rentalRoutes = require("./routes/rentals");

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

//use routes
app.use("/api/v1/rentals", rentalRoutes);

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
