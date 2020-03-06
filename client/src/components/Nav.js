import React from "react";
import { Link } from "react-router-dom";

export const Nav = ({ isLoggedIn }) => (
  <nav
    className="navbar navbar-expand-lg navbar-light"
    style={{ backgroundColor: "#e3f2fd" }}
  >
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/contact">
            Contact
          </Link>
        </li>
        {isLoggedIn === "1" && (
          <li className="nav-item">
            <Link className="nav-link" to="/new">
              New Post
            </Link>
          </li>
        )}
        {isLoggedIn === "0" && (
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
        )}
        <li className="nav-item">
          {isLoggedIn === "1" ? (
            <Link className="nav-link" to="/logout">
              Logout
            </Link>
          ) : (
            <Link className="nav-link" to="/login">
              Login
            </Link>
          )}
        </li>
      </ul>
    </div>
  </nav>
);
