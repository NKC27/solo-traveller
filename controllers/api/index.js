const router = require("express").Router();
const companyRoutes = require("./company");
const travellerRoutes = require("./traveller");

router.use("/users", userRoutes);

module.exports = router;
