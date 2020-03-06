const PostModel = require("../models/Post.model");

class PostControl {
  constructor() {
    if (
      process.env.RESET_DATABASE_ONLOAD &&
      process.env.RESET_DATABASE_ONLOAD === "true"
    ) {
      console.log(process.env.RESET_DATABASE_ONLOAD);
      this.reset();
    }
  }

  // async reset() {
  //   await PostModel.deleteMany({});
  //   await PostModel.create(postData);
  //   return "Reset Complete";
  // }

  async newPost(body) {
    let status = 0;
    let msg = "";
    body.id = uuidv1(); //add unique ID

    try {
      await PostModel.create(body);
      status = 200;
      msg = "New Post Created";
    } catch (e) {
      status = 500;
      msg = e;
    }

    return { status: status, msg: msg, id: body.id };
  }

  async deleteByID(id) {
    const delRes = await PostModel.deleteOne({ id: id });
    if (delRes.deletedCount > 0) {
      return { didDelete: true };
    }

    return { didDelete: false };
  }

  async updateById(id, post) {
    return PostModel.findOneAndUpdate({ id: id }, post, { new: true });
  }

  async findAll() {
    return PostModel.find({});
  }

  // async findOneByID(id) {
  //   return PostModel.findOne({ id: id });
  // }

  // async findOneCommentByID(postID, commentID) {
  //   return PostModel.findOne(
  //     { id: postID, "comments.id": commentID },
  //     { "comments.$": 1 }
  //   );
  // }

  // async updateCommentByID(postID, commentID, body) {
  //   const comment = await PostModel.updateOne(
  //     { id: postID, "comments.id": commentID },
  //     { $set: { "comments.$.msg": body } },
  //     { new: true, upsert: true }
  //   );

  //   return comment;
  // }

  // async newComment(postID, body) {
  //   const commentObj = { msg: body, id: uuidv1() };

  //   const comment = await PostModel.updateOne(
  //     { id: postID },
  //     { $push: { comments: commentObj } },
  //     { new: true, upsert: true }
  //   );

  //   if (comment.nModified > 0) {
  //     comment.id = uuidv1();
  //   }

  //   return comment;
  // }

  // async deleteCommentByID(postID, commentID) {
  //   const comment = await PostModel.updateOne(
  //     { id: postID },
  //     { $pull: { comments: { id: commentID } } },
  //     { multi: true }
  //   );

  //     return comment;
  //   }
}

module.exports = PostControl;
