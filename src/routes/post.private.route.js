const express = require("express");
const fs = require("fs");
const path = require("path");
const Busboy = require("busboy");
const Post = require("../models/Post.model");
const postPrivateRouter = express.Router();

const uploadFolder = path.resolve(__dirname, "../../upload");

postPrivateRouter.use((req, res, next) => {
  console.log("session postPrivateRouter", req.session);
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).send("forbidden! maybe ,login?");
  }
});

postPrivateRouter.post("/new", async (req, res) => {
  let post = {};
  let status = 201;
  const MBSizeLimit = 10;
  const busboy = new Busboy({
    headers: req.headers,
    limits: { fileSize: MBSizeLimit * 1000000 }
  });

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    const saveTo = path.resolve(uploadFolder, filename);
    post.imgName = filename;
    file.on("limit", data => {
      responseMsg = "file size reached";
      status = 413; // http code for 'payload too large'
      fs.unlink(saveTo, () => {}); //remove the partial uploaded file
    });

    file.pipe(fs.createWriteStream(saveTo));
  });

  busboy.on("field", (fieldName, value, fieldNameTruncated) => {
    post[fieldName] = value;
  });

  busboy.on("finish", async () => {
    console.log("post", post);
    post.dateCreated = Date.now();
    const newDBRecord = await Post.create(post);
    res
      .status(status)
      .json({ id: newDBRecord.id })
      .send();
  });

  return req.pipe(busboy); //pipe the request object into busboy //https://flaviocopes.com/nodejs-streams/#pipe
});

postPrivateRouter.delete("/delete/:id", async (req, res) => {
  const deletePost = await Post.deleteOne({ _id: req.params.id });
  if (deletePost) {
    res.status(200).send({
      status: 200,
      message: "Post succesfully deleted"
    });
  }
});

postPrivateRouter.put("/update/:id", async (req, res) => {
  let post = {};
  let status = 201;
  const MBSizeLimit = 10;
  const busboy = new Busboy({
    headers: req.headers,
    limits: { fileSize: MBSizeLimit * 1000000 }
  });

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    const saveTo = path.resolve(uploadFolder, filename);
    post.imgName = filename;
    file.on("limit", data => {
      responseMsg = "file size reached";
      status = 413; // http code for 'payload too large'
      fs.unlink(saveTo, () => {}); //remove the partial uploaded file
    });

    file.pipe(fs.createWriteStream(saveTo));
  });

  busboy.on("field", (fieldName, value, fieldNameTruncated) => {
    post[fieldName] = value;
  });

  busboy.on("finish", async () => {
    console.log("post", post);
    post.dateCreated = Date.now();
    const updateDBRecord = await Post.findOneAndUpdate(
      { _id: req.params.id },
      post,
      {
        new: true
      }
    );
    res
      .status(status)
      .json(updateDBRecord)
      .send();
  });

  return req.pipe(busboy);
});

module.exports = postPrivateRouter;
