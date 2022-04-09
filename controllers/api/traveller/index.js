const router = require("express").Router();
// const companyRoutes = require("./company");
// const travellerRoutes = require("./traveller");
const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");
router.use("/", userRoutes);

router.use("/post", postRoutes);

module.exports = router;
