const router = require("express").Router();
const companyRoutes = require("./company");
const travellerRoutes = require("./traveller");
const tripRoutes = require("./trip-routes");

router.use("/users", travellerRoutes);
router.use("/admin", companyRoutes);
router.use("/trip", tripRoutes);

module.exports = router;
