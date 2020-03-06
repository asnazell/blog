const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcryptjs");
const UserModel = require("../models/User.model");

userRouter.post("/new", async (req, res) => {
  console.log("req.body", req.body);
  req.body.password = bcrypt.hashSync(req.body.password);
  const userCurrent = await UserModel.findOne({ username: req.body.username });
  if (userCurrent) {
    res.status(400).send({ message: "User already exists" });
  } else {
    const { name, email, password } = req.body;
    const user = await UserModel.create({
      name,
      email,
      password
    });
    if (user)
      res.status(201).json({ message: "user created, you may now sign in" });
    else res.status(500).send("could not create user");
  }
});

module.exports = userRouter;
