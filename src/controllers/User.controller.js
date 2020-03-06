const User = require("../models/User.model");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Backend; User not found"
      });
    }
    req.profile = user; //adds profile object in req with user info
    next();
  });
};

exports.hasAuthorization = (res, req, next) => {
  const authorized = req.profile && req.auth && req.profile === req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized"
    });
  }
};

exports.allUsers = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }

    res.json(users);
  }).select("name email updated created");
};

exports.deleteUser = (req, res, next) => {
  let user = req.profile;
  user.remove((err, user) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }

    res.json({ message: "User deleted" });
  });
};
