const router = require("express").Router();
const { User, Post, Trip } = require("../../../models");

router.post("/:id", async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
      trip_id: parseInt(req.params.id),
    });
    console.log(newPost);
    res.status(200).redirect(`/api/trip/group/${req.params.id}`);
  } catch (err) {
    res.status(400);
  }
});

module.exports = router;
