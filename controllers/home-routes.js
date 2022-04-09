const router = require("express").Router();
// const { where } = require("sequelize/types");
const { Trip, User, Company, TripUser } = require("../models");
const withAuth = require("../utils/auth");
const { isAdmin } = require("../utils/auth");

router.get("/homepage", async (req, res) => {
  try {
    res.render("generalHomepage", { layout: "other" });
  } catch (error) {}
});

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

    console.log(req.session);
    if (!req.session.logged_in) {
      res.redirect("/login-form");
      return;
    }
    console.log(req.headers);

    const tripData = await Trip.findAll({
      include: {
        model: User,
      },
    });
    // userTrips = array of all trips
    const userTrips = tripData.map((trip) => trip.get({ plain: true }));
    console.log(userTrips);

    // myTrips is = to an array of all trips where users contains a user with an id === req.session.user_id
    const myTrips = userTrips.filter((trip) => {
      console.log("trip");
      console.log(trip);
      return !trip.users.every((user, i, arr) => {
        console.log("User");
        console.log(user);
        return user.id !== req.session.user_id;
      });
    });

    // Render user dashboard with logged_in variablle and myTrips array
    return res.render("dashboard", {
      logged_in: req.session.logged_in,
      myTrips,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for any kind of user to access any company dashboard
router.get("/company-dashboard/:id", async (req, res) => {
  try {
    console.log("company dash");
    if (!req.session.logged_in) {
      res.redirect("/login-form");
      return;
    }
    console.log("REQ");
    console.log(req.session);

    console.log(req.session.company_id);
    console.log(req.params.id);
    let companyAdmin = isAdmin(req.session.company_id, req.params.id);

    console.log(companyAdmin);
    const companyData = await Company.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Trip }],
    });
    console.log(companyData);
    const company = companyData.get({ plain: true });
    console.log(company);
    console.log("LOGGED IN");
    console.log(req.session.logged_in);
    res.render("companyDashboard", {
      logged_in: req.session.logged_in,
      ...company,
      companyAdmin,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for logged in company to access their own dashboard
router.get("/company-dashboard", async (req, res) => {
  try {
    console.log("company dash");
    if (!req.session.logged_in) {
      res.redirect("/login-form");
      return;
    }

    let companyAdmin = isAdmin(req.session.company_id, req.session.company_id);
    console.log(companyAdmin);
    const companyData = await Company.findByPk(req.session.company_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Trip }],
    });
    console.log(companyData);
    const company = companyData.get({ plain: true });
    console.log(company);
    res.render("companyDashboard", {
      logged_in: req.session.logged_in,
      isOwnAdmin: req.session.isOwnAdmin,
      ...company,
      companyAdmin,
    });
  } catch (err) {
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
