// const mongoose = require('mongoose')
let databaseController = require("../../serverController/methods_DB")
const router = require("express").Router();
// mongoose.connect("mongodb://localhost/Gradus", { useNewUrlParser: true });



router.route("/")
    .get(databaseController.findAll)
// router.get("/", )

module.exports = router;