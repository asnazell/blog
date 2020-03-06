const express = require("express");
const router = express.Router();
const Post = require("../models/Post.model");

router.get("/all", async (req, res) => {
  res.json(await Post.find({})).send();
});

router.get("/find/:id", async (req, res) => {
  res.json(await Post.findById(req.params.id)).send();
});

module.exports = router;
