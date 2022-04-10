const router = require("express").Router();
// const companyRoutes = require("./company");
// const travellerRoutes = require("./traveller");
const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");
const commentRoutes = require("./comment-routes");
router.use("/", userRoutes);

router.use("/post", postRoutes);
router.use("/comment", commentRoutes);

module.exports = router;
