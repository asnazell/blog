import React from "react";

export class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      title: "",
      author: "",
      body: "",
      date: new Date()
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    console.log("submit clicked");

    const formData = new FormData(); //https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
    formData.append("file", this.state.file);
    formData.append("title", this.state.title);
    formData.append("author", this.state.author);
    formData.append("body", this.state.body);

    const response = await fetch("/post/private/new", {
      method: "POST",
      body: formData
    }).catch(e => console.log(e));

    if (response.status === 201) {
      console.log("new post created");
      this.props.history.push("/");
    }

    console.log(response);
  };

  handleOnChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFileChange = event => {
    this.setState({
      file: event.target.files[0]
    });
  };

  // const requestOptions = {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify({
  //     file: this.state.file,
  //     title: this.state.title,
  //     author: this.state.author,
  //     body: this.state.body,
  //     date: this.state.date
  //   })
  //   //   redirect: "follow",
  //   //   credentials: "same-origin"
  // };
  //   fetch("http://localhost:3000/post/private/new", requestOptions).then(
  //     async data => {
  //       if (data.status === 201) {
  //         console.log("new post created");
  //         this.props.history.push("/");
  //       }
  //     }
  //   );
  // };

  render() {
    return (
      <div className="form-container">
        <form className="form-new-post" onSubmit={this.handleSubmit}>
          <div className="form-field">
            <div className="form-label" />
            <h3>New Post</h3>
          </div>
          <div className="form-field">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              className="form-input"
              type="file"
              id="image"
              name="image"
              onChange={this.handleFileChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              placeholder="Post title.."
              className="form-input"
              type="text"
              id="title"
              name="title"
              onChange={this.handleOnChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="author" className="form-label">
              Author
            </label>
            <input
              placeholder="Your name.."
              className="form-input"
              type="text"
              id="author"
              name="author"
              onChange={this.handleOnChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="body" className="form-label">
              Body
            </label>
            <textarea
              id="body"
              rows="6"
              name="body"
              className="form-input"
              placeholder="Your post.."
              onChange={this.handleOnChange}
            />
          </div>
          <div className="form-field">
            <div className="form-label" />
            <button type="submit" className="submit">
              Add New Post
            </button>
          </div>
        </form>
      </div>
    );
  }
}
