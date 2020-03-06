const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  author: String,
  body: String,
  imgName: String,
  dateCreated: Date,
  comments: [{ msg: String }]
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
