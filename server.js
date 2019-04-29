var express = require("express");
var app = express();
const routes = require("./serverRoutes");

//React always uses Port 3000
//var PORT = process.env.PORT || "production"; //for later

//If server Port changes you must change the proxy key in the client-side package.json
var PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// static heroku serve
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }
// Add routes, both API and view
app.use("/", routes);

//app.listen always goes at the end of your code
app.listen(PORT, function() {
  console.log("App listening on PORT:" + PORT);
});
