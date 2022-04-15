const router = require("express").Router();
const { Company } = require("./../../../models");
const { withAuth } = require("../../../utils/auth");
// const { Trip, User } = require("../models");
// const withAuth = require("../utils/auth");

router.post("/signup", async (req, res) => {
  try {
    const companyData = await Company.create(req.body);
    const company = companyData.get({ plain: true });
    console.log("Company Data: " + company);
    req.session.save(() => {
      req.session.company_id = companyData.id;
      req.session.logged_in = true;
      res.status(200).json(companyData);
    });
    // res.json(companyData);
  } catch (err) {
    res.status(400);
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const companyData = await Company.findOne({
      where: { email: req.body.email },
    });

    if (!companyData) {
      res.status(400).json("Incorrect email or password, please try again");
      return;
    }

    console.log(companyData);

    const validPassword = companyData.checkPassword(req.body.password);
    console.log(validPassword);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    console.log("hello");
    req.session.save(() => {
      req.session.company_id = companyData.id;
      req.session.isOwnAdmin = true;
      req.session.logged_in = true;
      res.status(200).json(companyData);
    });
    console.log(req.session);
    res.status(200);
    // res.status(200).render("companyDashboard", {
    //   logged_in: req.session.logged_in,
    //   isOwnAdmin: req.session.isOwnAdmin,
    // });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
