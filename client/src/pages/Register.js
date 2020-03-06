import React, { Component } from "react";
// import { Link } from "react-router-dom";

export class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }
  handleOnChange = event => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();

    const newUser = {
      username: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
      //   redirect: "follow",
      //   credentials: "same-origin"
    };
    console.log(newUser);
    fetch("/user/new", requestOptions).then(async data => {
      if (data.status === 201) {
        console.log("new user created");
        this.props.history.push("/login");
      }
    });
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="form-container">
        <form className="form-register" onSubmit={this.handleSubmit}>
          <div className="form-field">
            <div className="form-label" />
            <h3>Register</h3>
          </div>
          <div className="form-field">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              placeholder="Name.."
              className="form-input"
              type="text"
              id="name"
              name="name"
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
              onChange={this.handleOnChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              placeholder="Enter password.."
              className="form-input"
              value={this.state.password}
              error={errors.password}
              type="password"
              id="password"
              name="password"
              onChange={this.handleOnChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="password" className="form-label">
              Confirm Password
            </label>
            <input
              placeholder="Confirm password.."
              className="form-input"
              value={this.state.password2}
              error={errors.password2}
              type="password"
              id="password2"
              name="password2"
              onChange={this.handleOnChange}
            />
          </div>
          <div className="form-field">
            <div className="form-label" />
            <button type="submit" className="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    );
  }
}
