const router = require("express").Router();
const { Company, Trip, User, TripUser } = require("../../../models");

router.get("/new-trip", async (req, res) => {
  try {
    res.status(200).render("createTrip", { logged_in: req.session.logged_in });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/create", async (req, res) => {
  try {
    console.log("create");
    const newTrip = await Trip.create({
      ...req.body,
      company_id: req.session.company_id,
    });
    console.log(newTrip);
    res.status(200).render("dashboard", { logged_in: req.session.logged_in });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    // @TODO check logged in company owns this trip
    console.log("update route hit");
    await Trip.update(req.body, { where: { id: req.params.id } });
    console.log("trip update");
    res
      //   .json("updated")
      .status(200)
      .render("dashboard", { logged_in: req.session.logged_in });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const tripData = await Trip.destroy({
      where: {
        id: req.params.id,
        company_id: req.session.company_id,
      },
    });
    console.log(tripData);
    // console.log("This is the post data" + postData);
    if (!tripData) {
      res.status(404).json({ message: "No Trip found with this id!" });
      return;
    }

    res.status(200).render("dashboard", { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
