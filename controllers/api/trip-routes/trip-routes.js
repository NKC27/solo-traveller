const router = require("express").Router();
const {
  Company,
  Trip,
  User,
  TripUser,
  Post,
  Comment,
} = require("../../../models");
const { isGoing } = require("../../../utils/auth");
// const { upload } = require("multer");

// @TODO add companyWithAuth to this route
router.get("/new-trip", async (req, res) => {
  try {
    res.status(200).render("createTrip", { logged_in: req.session.logged_in });
  } catch (error) {
    res.status(500).json(error);
  }
});

// @TODO add companyWithAuth to this route
router.get("/edit/:id", async (req, res) => {
  console.log("edit route");
  const tripData = await Trip.findByPk(req.params.id, {
    include: [
      {
        model: Company,
      },
    ],
  });
  const trip = tripData.get({ plain: true });
  if (trip.company_id === req.session.company_id) {
    isOwnAdmin = true;
  } else {
    isOwnAdmin = false;
  }
  res.render("editTrip", {
    trip,
    logged_in: req.session.logged_in,
    isOwnAdmin,
  });
});

// router.post("/image", async (req, res) => {
//   try {
//     res.status(200);
//   } catch (error) {
//     res.status(500);
//   }
// });

// @TODO add companyWithAuth
router.post("/create", async (req, res) => {
  try {
    console.log("create");
    console.log(req.body);
    const newTrip = await Trip.create({
      ...req.body,
      company_id: req.session.company_id,
    });
    console.log(newTrip);
    res
      .status(200)
      .render("companyDashboard", { logged_in: req.session.logged_in });
  } catch (error) {
    res.status(500).json(error);
  }
});

//  @TODO add companyWithAuth to this route
router.delete("/:id", async (req, res) => {
  try {
    console.log("DELETE ROUTE");
    console.log(req.params.id);
    console.log(req.session.company_id);
    await Trip.destroy({
      where: {
        id: req.params.id,
        company_id: req.session.company_id,
      },
    });
    // console.log(tripData);
    // console.log("This is the post data" + postData);
    // if (!tripData) {
    //   console.log("NO TRIP DATA");
    //   res.status(404).json("No Trip found with this id!");
    //   return;
    // }
    res
      //   .json("updated")
      .status(200)
      .render("company-dashboard", { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/going", async (req, res) => {
  try {
    if (!req.session.user_id) {
      res.redirect("userLogin");
    }
    // TEST STARTS HERE
    const tripData = await Trip.findByPk(req.body.trip_id, {
      include: [
        {
          model: Company,
        },
        {
          model: User,
        },
      ],
    });

    const trip = tripData.get({ plain: true });

    const travellers = trip.users;
    console.log("TRAVELLERS");
    console.log(travellers);
    const travellerIds = travellers.map((traveller) => {
      return traveller.id;
    });
    console.log("TRAVELLER IDS");
    console.log(travellerIds);
    console.log(req.session.user_id);
    if (travellerIds.includes(req.session.user_id)) {
      res.status(500);
      return;
    }
    // TEST ENDS HERE

    const tripUserData = await TripUser.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    // console.log(tripUserData);
    res.status(200).json(tripUserData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/group/:id", async (req, res) => {
  try {
    console.log("GROUP ROUTE");
    const tripData = await Trip.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
        {
          model: Post,
          include: [{ model: Comment, include: [{ model: User }] }, User],
        },
      ],
    });
    console.log(tripData);
    // userTrips = array of all trips
    const trip = tripData.get({ plain: true });

    const travellers = trip.users;
    const posts = trip.posts;

    console.log("TRIP");
    console.log(trip);
    const going = isGoing(travellers, req.session.user_id);

    // @TODO fix this with a redirect and alert
    if (!going) {
      res.status(401).json({
        message: "Please book onto this trip to view the trip group!",
      });
      return;
    }

    res.status(200).render("tripGroup", {
      trip,
      travellers,
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// This route returns an array of users who are marked as going on any given trip
// Need to add checks that the logged in user is included in the returned array before this information can be returned to them
// router.get("/going/:id", async (req, res) => {
//   try {
//     console.log(req.params.id);
//     const tripData = await Trip.findByPk(req.params.id, {
//       include: {
//         model: User,
//       },
//     });
//     console.log(tripData);
// userTrips = array of all trips
// const trip = tripData.get({ plain: true });
// console.log("trip");
// console.log(trip);
// const travellers = trip.users;
// let travellers = []
// userTrips.forEach((trip) => {
//   // console.log("trip");
//   if(trip.id === req.params.id){
//     trip.users
//   }
//   );

//     res.status(200).json(travellers);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// Updates the number of travellers column in a given trip
// Need to add checks that will prevent a user from marking themselves as going multiple times
router.put("/going", async (req, res) => {
  try {
    console.log("GOING ROUTE HIT");
    const tripData = await Trip.findByPk(req.body.trip_id, {
      include: [
        {
          model: Company,
        },
      ],
    });

    const trip = tripData.get({ plain: true });

    const usersGoing = trip.traveller_num;

    const newTravellerNum = usersGoing + 1;

    await Trip.update(
      { traveller_num: newTravellerNum },
      { where: { id: req.body.trip_id } }
    );
    // console.log(updatedPost);
    res

      //   .json("updated")
      .status(200)
      .render("dashboard", { logged_in: req.session.logged_in });
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
      .render("company-dashboard", { logged_in: req.session.logged_in });
  } catch (error) {
    res.status(500).json(error);
  }
});

// router.get("/group/:id", async (req, res) => {
//   try {
//     console.log("trip group route hit");
//     const tripData = await Trip.findByPk(req.params.id, {
//       include: [
//         {
//           model: Company,
//         },
//       ],
//     });
//     const trip = tripData.get({ plain: true });

//     res.status(200).render("tripGroup", { trip });
//   } catch (error) {
//     res.status(500).json("Page not found");
//   }
// });

module.exports = router;
