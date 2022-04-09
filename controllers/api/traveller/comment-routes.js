const router = require("express").Router();
const { User, Post, Trip, Comment } = require("../../../models");

router.post("/:id", async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      post_id: req.params.id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(400).json(req.body);
  }
});

module.exports = router;
