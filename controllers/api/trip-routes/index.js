const router = require("express").Router();
const tripRoutes = require("./trip-routes");

router.use("/", tripRoutes);

module.exports = router;
