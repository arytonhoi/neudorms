import React from "react";
import Home from "../components/home/Home";
import styled from "styled-components";
import "./HomeContainer.css";

const HomeWrapper = styled.div`
  margin: 32px 48px;
`;

class HomeContainer extends React.Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand mr-5" href="/home">
            neudorms
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active ml-4">
                <form class="form-inline">
                  <input
                    class="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
                    Search
                  </button>
                </form>
              </li>
            </ul>
            <a class="nav-link profile" href="/profile">
              Housing Group
            </a>
            <a class="nav-link profile" href="/profile">
              Bookmarks
            </a>
            <a class="nav-link profile" href="/profile">
              Profile
            </a>
          </div>
        </nav>
        <HomeWrapper>
          <Home />
        </HomeWrapper>
      </div>
    );
  }
}

export default HomeContainer;
