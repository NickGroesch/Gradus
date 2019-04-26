var express = require("express");
var app = express();
//React always uses Port 3000
//var PORT = process.env.PORT || "production";

var PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.listen always goes at the end of your code
app.listen(PORT, function() {
  console.log("App listening on PORT:" + PORT);
});
