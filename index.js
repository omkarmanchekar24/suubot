const express = require("express");
const bodyParser = require("body-parser");
//const admin = require("firebase-admin");

const users = require("./routes/api/users");
const stores = require("./routes/api/stores");

// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
// });
// const db = admin.firestore();

const app = express();

var cors = require("cors");
app.use(cors());

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Use routes
app.use("/api/users", users);
app.use("/api/stores", stores);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
