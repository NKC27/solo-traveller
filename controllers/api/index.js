const router = require("express").Router();
const companyRoutes = require("./company");
const travellerRoutes = require("./traveller");

router.use("/users", travellerRoutes);
router.use("/companies", companyRoutes);

module.exports = router;
