const router = require("express").Router();
const graphRoutes = require("./graphs");
const databaseRoutes = require("./database");


// Various routes
router.use("/graphs", graphRoutes);
router.use("/database", databaseRoutes);

module.exports = router;
