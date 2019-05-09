var express = require("express");
var app = express();
const routes = require("./serverRoutes");
// console.log(routes);

require("dotenv").config();

//=====DB/login dependencies
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
//const config = require("./db");
const users = require("./serverRoutes/user");

const PORT = process.env.PORT || 5000;

//=====DB/login dependencies
if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static("client/build"));
  // Express serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use(function (req, res, next) {
  // Website you wish to allow to
  //either localhost:3000 or heroku deployed link (https://guarded-sands-13025.herokuapp.com)
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

var databaseURI = "mongodb://localhost/Gradus";
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
} else {
  mongoose.connect(databaseURI, { useNewUrlParser: true });
}
var db = mongoose.connection;
db.on("error", err => console.log("mongoose error :", err));
db.once("open", () => console.log("mongoose connection successful"));

app.use(passport.initialize());
require("./passport")(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/", routes);

// var databaseURI = "mongodb://localhost/Gradus";
// if (process.env.MONGODB_URI) {
//   mongoose.connect(process.env.MONGODB_URI);
// } else {
//   mongoose.connect(databaseURI);
// }
// var db = mongoose.connection;
// db.on("error", err => console.log("mongoose error :", err));
// db.once("open", () => console.log("mongoose connection successful"));


app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
