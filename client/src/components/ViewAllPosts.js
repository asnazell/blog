import React from "react";
import { Link } from "react-router-dom";

export class ViewAllPosts extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  getPosts = async () => {
    const posts = await fetch("/post/all");
    const postList = await posts.json();
    console.log(postList);
    this.setState({
      posts: postList
    });
  };

  componentDidMount() {
    this.getPosts();
  }

  render() {
    return (
      <div className="view-all-posts">
        {this.state.posts.map((post, i) => (
          <Link className="post-link" to={`/post/${post._id}`} key={i}>
            <div className="post-summary">
              <img
                className="post-summary-image"
                src={`/${post.imgName}`}
                alt="Blog Post Placeholder"
              />

              {/* <img
            src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
            alt={post.title}
            onError={i => (i.target.src = `${DefaultPost}`)}
            className="img-thunbnail mb-3"
            style={{ height: "200px", width: "100%" }}
          /> */}
              <div className="post-summary-title">{post.title}</div>
            </div>
          </Link>
        ))}
      </div>
    );
  }
}
