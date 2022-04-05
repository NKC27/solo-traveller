const router = require("express").Router();
const { Trip, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    res.render("homepage");
  } catch {
    res.status(500).json(err);
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    res.render("dashboard", { logged_in: req.session.logged_in });
  } catch {
    res.status(500).json(err);
  }
});

router.get("/login-form", async (req, res) => {
  try {
    // console.log("login form hit");
    res.render("userLogin");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/signup-form", async (req, res) => {
  try {
    res.render("userSignup");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/company-signup-form", async (req, res) => {
  try {
    res.render("companySignup");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/company-login-form", async (req, res) => {
  try {
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
