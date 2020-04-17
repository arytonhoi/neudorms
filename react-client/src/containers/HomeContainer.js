import React from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import BuildingList from "../components/home/BuildingList";
import buildingReducer from "../reducers/BuildingReducer";
import "./HomeContainer.css";
import styled from "styled-components";

const HomeWrapper = styled.div`
  margin: 32px 48px;
`;

const rootReducer = combineReducers({
  buildings: buildingReducer,
});

let store = createStore(rootReducer);

class HomeContainer extends React.Component {
  render() {
    return (
      <Provider store={store}>
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
              <a className="nav-link profile" href="/profile">
                Housing Group
              </a>
              <a className="nav-link profile" href="/profile">
                Bookmarks
              </a>
              <a className="nav-link profile" href="/profile">
                Profile
              </a>
            </div>
          </nav>
          <HomeWrapper>
            <BuildingList />
          </HomeWrapper>
        </div>
      </Provider>
    );
  }
}

export default HomeContainer;
