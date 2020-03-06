import React from "react";

export class PostEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      existingFile: "",
      newFile: "",
      id: "",
      title: "",
      author: "",
      body: ""
    };
  }

  handleOnSubmit = async e => {
    e.preventDefault();
    console.log("submit clicked");

    const formData = new FormData(); //https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
    formData.append("file", this.state.newFile);
    formData.append("title", this.state.title);
    formData.append("author", this.state.author);
    formData.append("body", this.state.body);

    const response = await fetch(
      `/post/private/update/${this.props.match.params.id}`,
      {
        method: "PUT",
        body: formData
      }
    ).catch(e => console.log(e));

    if (response.status === 201) {
      console.log("post updated");
      this.props.history.push("/");
    }

    console.log(response);
  };

  handleOnChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFileChange = event => {
    this.setState({
      newFile: event.target.files[0]
    });
  };

  // handleOnChange = event => {
  //   this.setState({
  //     [event.currentTarget.name]: event.currentTarget.value
  //   });
  // };

  // handleOnSubmit = async event => {
  //   event.preventDefault();
  //   const response = await fetch(
  //     `/post/private/update/${this.props.match.params.id}`,
  //     {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         title: this.state.title,
  //         author: this.state.author,
  //         body: this.state.body
  //       })
  //     }
  //   ).then(response => response.json());

  //   if (response._id === this.props.match.params.id) {
  //     window.location.href = `/post/${this.props.match.params.id}`;
  //   } else {
  //     // @todo: handle error
  //   }
  // };

  componentDidMount() {
    this.getPost();
  }

  getPost = async () => {
    const response = await fetch(
      `/post/find/${this.props.match.params.id}`
    ).then(response => response.json());
    console.log(response);
    this.setState({
      existingFile: response.imgName,
      title: response.title,
      id: response._id,
      author: response.author,
      body: response.body
    });
  };

  handleFileChange = event => {
    this.setState({
      newFile: event.target.files[0]
    });
  };

  render() {
    return (
      <div className="form-container">
        <form className="form-edit-post" onSubmit={this.handleOnSubmit}>
          <div className="form-field">
            <div className="form-label" />
            <h3>Edit Post</h3>
          </div>
          <div className="form-field">
            <div className="form-label" />
            <img
              className="post-edit-image"
              src={`http://localhost:3000/${this.state.existingFile}`}
              alt="Blog Post Placeholder"
            />
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
              placeholder="Edit post title.."
              className="form-input"
              type="text"
              id="title"
              name="title"
              value={this.state.title}
              onChange={this.handleOnChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="author" className="form-label">
              Author
            </label>
            <input
              placeholder="Edit name.."
              className="form-input"
              type="text"
              id="author"
              name="author"
              value={this.state.author}
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
              placeholder="Edit post.."
              value={this.state.body}
              onChange={this.handleOnChange}
            />
          </div>
          <div className="form-field">
            <div className="form-label" />
            <button type="submit" className="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
