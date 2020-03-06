require("dotenv").config();
require("./mongo");

const express = require("express");
const session = require("express-session");
const app = express();
const fs = require("fs");
const cors = require("cors");
const port = process.env.PORT || 3000;
const host = process.env.EXPRESS_HOST || "0.0.0.0";
const path = require("path");
const postRoutes = require("./routes/post.route");
const userRoutes = require("./routes/user.route");
const postPrivateRoutes = require("./routes/post.private.route");
const authRouter = require("./routes/auth.route");
const uploadFolder = path.resolve(__dirname, "../upload");

// make sure the upload folder exists
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.static(uploadFolder));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "GA window sill cat",
    name: "ga_cookie_ftw",
    cookie: { maxAge: 1000 * 60 * 60 },
    resave: false,
    saveUninitialized: false
  })
);
app.use("/post", postRoutes);
app.use("/post/private", postPrivateRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRouter);
app.use(cors());

app.listen(port, host, () =>
  console.log(`Blog app listening on ${host}:${port}`)
);
