const router = require("express").Router();
// const companyRoutes = require("./company");
// const travellerRoutes = require("./traveller");
const userRoutes = require("./user-routes");
router.use("/", userRoutes);

module.exports = router;
