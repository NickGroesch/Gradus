//Put functions that routes call in here... ex: db.findAll() etc.
let db = require("../serverModels")
//controller should only export functions to query the DB

module.exports = {
    findAll: function (req, res) {
        db.CantusFirmus.find({}).then(
            data => res.json(data)
            // console.log("data: ", data)
        )
    }
}
