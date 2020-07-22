const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const roles = require("./routes/api/roles");
const users = require("./routes/api/users");
// const stores = require("./routes/api/stores");
// const products = require("./routes/api/products");

const app = express();

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require("./config/keys").mongoURI;

//Connect to mongoDb
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected Successfully..."))
  .catch((err) => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport Config
require("./config/passport")(passport);

//Use routes
app.use("./api/roles", roles);
app.use("/api/users", users);
//app.use("/api/stores", stores);
//app.use("/api/products", products);
//puchases

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
