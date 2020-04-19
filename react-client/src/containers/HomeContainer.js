import React from "react";
import BuildingList from "../components/home/BuildingList";
import "./HomeContainer.css";
import styled from "styled-components";
import { profile, logout } from "../services/UserService";

const BuildingWrapper = styled.div`
  margin: 32px 48px;
`;

const SearchBox = styled.div`
  height: 96px;
  margin: 0px 72px;
  padding-left: 24px;
  padding-right: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  background-color: white;
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
        <div className="search-wrapper">
          <div className="container">
            <SearchBox>
              <i class="fas fa-search" />
              <input
                class="form-control form-control-lg search-input"
                id="search"
                type="text"
                placeholder="Dorm name or keyword"
              />
              <button className="btn btn-primary search-btn">
                <span className="search-btn-text">Search</span>
              </button>
            </SearchBox>
          </div>
        </div>

        <BuildingWrapper>
          <BuildingList />
        </BuildingWrapper>
      </div>
    );
  }
}

export default HomeContainer;
