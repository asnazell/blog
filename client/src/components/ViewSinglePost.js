import React from "react";
import { withRouter } from "react-router-dom";

const Comments = ({ data }) => (
  <div className="comment-list">
    {data.map(comment => (
      <div key={comment._id} className="comment-list-item">
        {comment.msg}
      </div>
    ))}
  </div>
);

class ViewSinglePostClass extends React.Component {
  constructor() {
    super();
    this.state = {
      post: null,
      date: new Date()
    };
  }

  componentDidMount() {
    this.getPost();
  }

  editPost = () => {
    window.location.href = `/update/${this.props.id}`;
  };

  deletePost = async () => {
    const response = await fetch(`/post/private/delete/${this.props.id}`, {
      method: "DELETE"
    }).then(response => response.json());

    if (response.status === 200) {
      this.props.history.push("/");
    } else {
      // @todo: handle error
    }
  };

  confirmDelete = () => {
    if (window.confirm("Are you sure you wish to delete this item?"))
      this.deletePost();
  };

  getPost = async () => {
    const response = await fetch(`/post/find/${this.props.id}`);
    const post = await response.json();
    console.log(post);
    this.setState({
      post: post
    });
  };

  render() {
    const { post } = this.state;
    console.log("{post}", post);
    return !post ? null : (
      <div className="view-single-post">
        <div className="single-post-summary">
          <img
            className="single-post-summary-image"
            src={`http://localhost:3000/${post.imgName}`}
            alt="Blog Post Placeholder"
          />
          <div className="post-summary-title">{post.title}</div>
          {/* <div>{post._id}</div> */}
          <div className="single-post-body">{post.body}</div>
          <div className="post-author">{post.author} </div>

          <div className="span-with-margin text-grey">{post.time}</div>

          <Comments data={post.comments} />
          <div className="post-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.editPost}
            >
              Edit Post
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.confirmDelete}
            >
              Delete Post
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export const ViewSinglePost = withRouter(ViewSinglePostClass);
