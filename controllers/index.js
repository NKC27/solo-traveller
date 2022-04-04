const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
router.get("/", (req, res) => {
  res.render("homepage");
});

module.exports = router;
