const router = require("express").Router();
const { User, Post, Trip } = require("../../../models");

router.post("/:id", async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
      trip_id: parseInt(req.params.id),
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
