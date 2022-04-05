const router = require("express").Router();
const { Company } = require("./../../../models");
// const { Trip, User } = require("../models");
// const withAuth = require("../utils/auth");

router.post("/signup", async (req, res) => {
  console.log("signup route hit");
  console.log(req.body);
  try {
    const companyData = await Company.create(req.body);
    const company = companyData.get({ plain: true });
    console.log("Company Data: " + company);
    req.session.save(() => {
      req.session.user_id = companyData.id;
      req.session.logged_in = true;
      res.status(200).json(companyData);
    });
    // res.json(companyData);
  } catch (err) {
    res.status(400).json(err);
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

    const validPassword = await companyData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = companyData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
    res.json(companyData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
