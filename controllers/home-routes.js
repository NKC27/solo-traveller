const router = require("express").Router();
// const { where } = require("sequelize/types");
const { Trip, User, Company, TripUser } = require("../models");
const withAuth = require("../utils/auth");
const { isAdmin } = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    res.render("generalHomepage", { layout: "other" });
  } catch (error) {}
});

router.get("/homepage", async (req, res) => {
  try {
    const tripData = await Trip.findAll({
      include: [
        {
          model: Company,
        },
      ],
    });

    // Serialize data so the template can read it
    const trips = tripData.map((trip) => trip.get({ plain: true }));
    console.log(trips);
    res.render("homepage", {
      logged_in: req.session.logged_in,
      trips,
      user_id: req.session.user_id,
      isOwnAdmin: req.session.isOwnAdmin,
    });
  } catch {
    res.status(500);
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    //

    if (req.session.company_id) {
      res.redirect("/company-dashboard");
      return;
    }
    if (!req.session.logged_in) {
      res.redirect("/login-form");
      return;
    }

    const tripData = await Trip.findAll({
      include: {
        model: User,
      },
    });
    // userTrips = array of all trips
    const userTrips = tripData.map((trip) => trip.get({ plain: true }));

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

    const userData = await User.findByPk(req.session.user_id);
    const user = userData.get({ plain: true });

    // Render user dashboard with logged_in variable and myTrips array
    return res.render("dashboard", {
      logged_in: req.session.logged_in,
      myTrips,
      user,
    });
  } catch (err) {
    res.status(500);
  }
});

// Route for any kind of user to access any company dashboard
router.get("/company-dashboard/:id", async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect("/login-form");
      return;
    }
    // Comparing company id to param id to check if the user has authorisation to edit and delete on this page
    let companyAdmin = isAdmin(req.session.company_id, req.params.id);

    const companyData = await Company.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Trip }],
    });

    const company = await companyData.get({ plain: true });

    res.render("companyDashboard", {
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      ...company,
      companyAdmin,
      isOwnAdmin: true,
    });
  } catch (err) {
    res.status(500);
  }
});

// Route for logged in company to access their own dashboard
router.get("/company-dashboard", async (req, res) => {
  try {
    if (req.session.user_id) {
      res.redirect("/dashboard");
      return;
    }
    if (!req.session.logged_in) {
      res.redirect("/company-login-form");
      return;
    }

    let companyAdmin = isAdmin(req.session.company_id, req.session.company_id);

    const companyData = await Company.findByPk(req.session.company_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Trip }],
    });

    const company = await companyData.get({ plain: true });

    res.render("companyDashboard", {
      logged_in: req.session.logged_in,
      isOwnAdmin: req.session.isOwnAdmin,
      ...company,
      companyAdmin,
    });
  } catch (err) {
    res.status(500);
  }
});

router.get("/login-form", async (req, res) => {
  try {
    if (req.session.company_id) {
      res.redirect("/company-dashboard");
      return;
    }
    if (req.session.logged_in) {
      res.redirect("/dashboard");
      return;
    }
    res.render("userLogin");
  } catch (error) {
    res.status(500);
  }
});

router.get("/signup-form", async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect("/dashboard");
    }
    res.render("userSignup");
  } catch (error) {
    res.status(500);
  }
});

router.get("/company-signup-form", async (req, res) => {
  try {
    if (req.session.logged_in && req.session.company_id) {
      res.redirect("/company-dashboard");
    } else if (req.session.logged_in) {
      res.redirect("/dashboard");
      return;
    }
    res.render("companySignup");
  } catch (error) {
    res.status(500);
  }
});

router.get("/company-login-form", async (req, res) => {
  try {
    if (req.session.logged_in && req.session.company_id) {
      res.redirect("/company-dashboard");
    } else if (req.session.logged_in) {
      res.redirect("/dashboard");
      return;
    }
    res.render("companyLogin");
  } catch (error) {
    res.status(500);
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
