var express = require("express");
var app = express();
const routes = require("./serverRoutes");
require('dotenv').config()

//=====DB/login dependencies
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db');
const users = require('./serverRoutes/user');
//=====DB/login dependencies

//React always uses Port 3000
//var PORT = process.env.PORT || "production"; //for later

//======Mongoose=====LOCALLY COMMENTED OUT
// mongoose.connect(config.DB, { useNewUrlParser: true }).then(
//   () => { console.log('Database is connected') },
//   err => { console.log('Can not connect to the database' + err) }
// );

// const app = express();
app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/', routes)
app.get('/', function (req, res) {
  res.send('hello');
});
//=====Mongoose======

//If server Port changes you must change the proxy key in the client-side package.json
// var PORT = process.env.PORT || 3001;
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// static heroku serve
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }
// Add routes, both API and view
// app.use("/", routes);

// //app.listen always goes at the end of your code
// app.listen(PORT, function() {
//   console.log("App listening on PORT:" + PORT);
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
