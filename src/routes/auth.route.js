const express = require("express");

const AuthRouter = express.Router();
const bcrypt = require("bcryptjs");
const UserModel = require("../models/User.model");

//Router middleware
AuthRouter.use(async (req, res, next) => {
  console.log("SESSION", req.session);
  //check if the user is signed in, skip if they are
  if (typeof req.session.user !== "undefined" || req.url === "/login") {
    next();
    return;
  }
  console.log("user not signed in, checking for valid credentials");
  res.status(401).send({ error: "Forbidden" });
});

AuthRouter.post("/login", async (req, res) => {
  console.log("login", req.body);
  const { email, password } = req.body;
  user = await UserModel.findOne({ email });
  if (user) {
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (passwordCheck) {
      console.log("valid user profile found, adding profile to session");
      req.session.user = { id: user._id };
      console.log("session AuthRouter", req.session);
      res.status(200).send({
        profile: { email: user.email, password: user.password }
      });
    } else {
      res.status(404).send({ error: "Authentication error" });
    }
  } else {
    res.status(404).send({ error: "User does not exist" });
  }
});

AuthRouter.get("/logout", async (req, res) => {
  console.log("session logout", req.session);

  req.session.destroy();
  res.send("logout route");
});

module.exports = AuthRouter;
