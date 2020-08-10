const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const router = express.Router();
const logger = require("./config/logger");
const engines = require("consolidate");

//Logger
const winston = require("winston"),
  expressWinston = require("express-winston");

//const roles = require("./routes/api/roles");
const users = require("./routes/api/customers/users");
const products = require("./routes/api/customers/products");
const stores_customer = require("./routes/api/customers/stores");
const paytm = require("./routes/api/customers/paytm");
const admin_activity = require("./routes/api/admin/activity");
const stores = require("./routes/api/seller/stores");
const professionals = require("./routes/api/professional/professionals");

const app = express();

app.engine("ejs", engines.ejs);
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(cors({ origin: true, credentials: true }));
app.use(express.static("public"));

//Logger middleware
app.use((req, res, next) => {
  console.log(req.body);
  next();
});

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require("./config/keys").mongoURI;

//Connect to mongoDb
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected Successfully..."))
  .catch((err) => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport Config
require("./config/passport")(passport);

// app.use((req, res, next) => {
//   console.log(req.body);
//   let oldSend = res.send;
//   res.send = function (data) {
//     console.log(JSON.parse(data));
//     oldSend.apply(res, arguments);
//   };
//   next();
// });

//Use routes

//admin
//app.use("/api/roles", roles);

//customer
app.use("/api/customers/users", users);
app.use("/api/customers/products", products);
app.use("/api/customers/stores", stores_customer);
app.use("/api/customers/paytm", paytm);

//seller
app.use("/api/seller/stores", stores);

//professional
app.use("/api/professional/", professionals);

//Admin
app.use("/api/admin/activity", admin_activity);

//puchases

const port = process.env.PORT || 5000;

app.listen(port, () => logger.log("info", `server running on port ${port}`));
