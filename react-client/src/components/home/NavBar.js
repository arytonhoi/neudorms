import React from "react";
import { Link } from "react-router-dom";

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
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse mr-3" id="navbarText">
          <ul className="navbar-nav mr-auto" />
          {props.loggedIn && (
            <div className="row">
              {/* <a className="nav-link profile" href="#">
                Housing Group
              </a> */}
              {props.role === "user" && (
                <Link className="nav-link profile" to="/bookmarks">
                Bookmarks
              </Link>
              )}
              <Link
                className="nav-link profile"
                to={`/profile`}
              >
                Profile
              </Link>
              <Link
                className="nav-link profile"
                to="#"
                onClick={props.logout}
              >
                Log Out
              </Link>
            </div>
          )}
          {!props.loggedIn && (
            <div className="row">
              <Link className="nav-link profile" to="/login">
                Log In
              </Link>
              <Link className="nav-link profile" to="/register">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>
    );
}
