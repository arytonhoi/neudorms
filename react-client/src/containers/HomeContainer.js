import React from "react";
import BuildingList from "../components/home/BuildingList";
import "./HomeContainer.css";
import styled from "styled-components";

const HomeWrapper = styled.div`
  margin: 32px 48px;
`;

class HomeContainer extends React.Component {
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
            <a className="nav-link profile" href="/profile/ahoi">
              Housing Group
            </a>
            <a className="nav-link profile" href="/bookmarks">
              Bookmarks
            </a>
            <a className="nav-link profile" href="/profile/ahoi">
              Profile
            </a>
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
