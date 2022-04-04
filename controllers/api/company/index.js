const router = require("express").Router();
// const companyRoutes = require("./company");
// const travellerRoutes = require("./traveller");
const authRoutes = require("./company-routes");

router.use("/auth", authRoutes);
// router.use("/companies", companyRoutes);

module.exports = router;
