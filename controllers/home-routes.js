const router = require("express").Router();
const { Trip, User, Company } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const tripData = await Trip.findAll({
      include: [
        {
          model: Company,
          attributes: ["user_name"],
        },
      ],
    });

    // Serialize data so the template can read it
    const trips = tripData.map((trip) => trip.get({ plain: true }));
    res.render("homepage", { logged_in: req.session.logged_in, trips });
  } catch {
    res.status(500).json(err);
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    //

    //
    res.render("dashboard", { logged_in: req.session.logged_in });
  } catch {
    res.status(500).json(err);
  }
});

router.get("/company-dashboard", async (req, res) => {
  try {
    const companyData = await Company.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Trip }],
    });

    const company = companyData.get({ plain: true });
    res.render("companyDashboard", {
      logged_in: req.session.logged_in,
      ...company,
    });
  } catch {
    res.status(500).json(err);
  }
});

router.get("/login-form", async (req, res) => {
  try {
    // console.log("login form hit");
    if (req.session.logged_in) {
      res.redirect("/dashboard");
    }
    res.render("userLogin");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/signup-form", async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect("/dashboard");
    }
    res.render("userSignup");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/company-signup-form", async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect("/company-dashboard");
    }
    res.render("companySignup");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/company-login-form", async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect("/company-dashboard");
    }
    res.render("companyLogin");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
