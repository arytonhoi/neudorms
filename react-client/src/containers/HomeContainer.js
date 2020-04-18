import React from "react";
import BuildingList from "../components/home/BuildingList";
import "./HomeContainer.css";
import styled from "styled-components";
import { profile, logout } from "../services/UserService";

const HomeWrapper = styled.div`
  margin: 32px 48px;
`;

class HomeContainer extends React.Component {
  state = {
    profile: {
      username: "",
      loggedIn: false,
    },
  };

  componentDidMount() {
    profile().then((profile) => {
      if (profile.username) {
        this.setState({
          profile: profile,
          loggedIn: true,
        });
      } else {
        this.setState({
          loggedIn: false,
        });
      }
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand mr-5" href="/home">
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
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active ml-4">
                <form className="form-inline">
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button
                    className="btn btn-outline-success my-2 my-sm-0"
                    type="submit"
                  >
                    Search
                  </button>
                </form>
              </li>
            </ul>
            {this.state.loggedIn && (
              <div className="row">
                <a className="nav-link profile" href="#">
                  Housing Group
                </a>
                <a className="nav-link profile" href="/bookmarks">
                  Bookmarks
                </a>
                <a
                  className="nav-link profile"
                  href={`/profile/${this.state.profile.username}`}
                >
                  Profile
                </a>
                <a
                  className="nav-link profile"
                  href="#"
                  onClick={() => {
                    logout().then(this.setState({ loggedIn: false }));
                  }}
                >
                  Log Out
                </a>
              </div>
            )}
            {!this.state.loggedIn && (
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
        <HomeWrapper>
          <BuildingList />
        </HomeWrapper>
      </div>
    );
  }
}

export default HomeContainer;
