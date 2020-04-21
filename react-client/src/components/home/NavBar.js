import React from "react";

export default function NavBar(props) {
    return (
      <nav className="navbar navbar-expand-lg navbar-light p-3">
        <a className="navbar-brand mr-5 ml-3" href="/home">
          neudorms
        </a>
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
              <a className="nav-link profile" href="#">
                Housing Group
              </a>
              <a className="nav-link profile"
                 href={`/bookmarks/${props.profile.username}`}
              >
                Bookmarks
              </a>
              <a
                className="nav-link profile"
                href={`/profile/${props.profile.username}`}
              >
                Profile
              </a>
              <a
                className="nav-link profile"
                href="#"
                onClick={props.logout}
              >
                Log Out
              </a>
            </div>
          )}
          {!props.loggedIn && (
            <div className="row">
              <a className="nav-link profile" href="/login">
                Log In
              </a>
              <a className="nav-link profile" href="/registration">
                Sign Up
              </a>
            </div>
          )}
        </div>
      </nav>
    );
}
