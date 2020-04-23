import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/js/dist/collapse";
import $ from "jquery";
import "./navbar.css";

export default function NavBar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light p-3">
      <Link className="navbar-brand mr-5 ml-3" to="/">
        neudorms
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onClick={() => $("#navbarText").toggleClass("justify-content-end")}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse ml-3 mr-3 justify-content-end" id="navbarText">
        {props.loggedIn && (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link profile" to="/search">
                Search
              </Link>
            </li>
            {props.role === "user" && (
              <li className="nav-item">
                <Link className="nav-link profile" to="/bookmarks">
                  Bookmarks
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link profile" to={`/profile`}>
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link profile" to="#" onClick={props.logout}>
                Log Out
              </Link>
            </li>
          </ul>
        )}
        {!props.loggedIn && (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link profile" to="/search">
                Search
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link profile" to="/login">
                Log In
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link profile" to="/register">
                Sign Up
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
