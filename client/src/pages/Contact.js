import React from "react";

export class Contact extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      message: ""
    };
  }
  handleOnChange = event => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    });
  };

  handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:3000/send", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        if (response.status === "success") {
          alert("Message Sent.");
          this.resetForm();
        } else if (response.status === "fail") {
          alert("Message failed to send.");
        }
      });
  }
  resetForm() {
    this.setState({ name: "", email: "", message: "" });
  }

  // onNameChange(event) {
  //   this.setState({ name: event.target.value });
  // }

  // onEmailChange(event) {
  //   this.setState({ email: event.target.value });
  // }

  // onMessageChange(event) {
  //   this.setState({ message: event.target.value });
  // }
  // handleSubmit(event) {}

  //   <img
  //   className="single-post-summary-image"
  //   src="/clouds.jpeg"
  //   alt="Blog Post Placeholder"
  // />

  render() {
    return (
      <div className="form-container">
        <form className="form-contact-us" onSubmit={this.handleOnSubmit}>
          <div className="form-field">
            <div className="form-label" />
            <h3>Contact us</h3>
          </div>

          <div className="form-field">
            <div className="form-label" />
            <p style={{ maxWidth: "400px", textAlign: "left" }}>
              I’d love to chat with you! So I make sure your email goes to the
              right place, please fill out the forms below.
            </p>
          </div>
          <div className="form-field">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              placeholder="Your name.."
              className="form-input"
              type="text"
              id="name"
              name="name"
              value={this.state.name}
              onChange={this.handleOnChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              placeholder="Your email.."
              className="form-input"
              type="text"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleOnChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              id="message"
              rows="6"
              name="message"
              className="form-input"
              placeholder="Your message.."
              value={this.state.message}
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
