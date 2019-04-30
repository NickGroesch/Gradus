const router = require("express").Router();
const graphRoutes = require("./graphs");

// Various routes
router.use("/graphs", graphRoutes);

module.exports = router;
