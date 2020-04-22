import React from "react";
import { connect } from "react-redux";
import { profile, logout } from "../actions/UserActions";
import { findAllBuildings, filterBuildings } from "../actions/BuildingActions";
import buildingService from "../services/BuildingService";
import BuildingList from "../components/home/BuildingList";
import FilterList from "../components/home/FilterList";
import SortBar from "../components/home/SortBar";
import "./HomeContainer.css";
import styled from "styled-components";
import userService from "../services/UserService";
import NavBar from "../components/home/NavBar";
import staffService from "../services/StaffService";

const BuildingWrapper = styled.div`
  margin: 32px 60px;
  display: flex;
  flex-direction: row;
`;

const RightWrapper = styled.div`
  width: 100%;
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

class SearchContainer extends React.Component {
  componentDidMount() {
    this.props.getProfile();
    this.props.findAllBuildings();
  }

  state = {
    searchTerm: "",
    filters: {
      residentTypes: [],
      maxCost: 0,
      buildingTypes: [],
      roomTypes: [],
      amenities: []
    },
  };

  search = () => {
    this.props.filterBuildings(this.state.searchTerm, this.state.filters);
  };

  applyFilters = (filters) => {
    this.props.filterBuildings(this.state.searchTerm, filters);
  }

  render() {
    return (
        <div>
          <NavBar
              profile={this.props.profile}
              loggedIn={this.props.loggedIn}
              logout={this.props.logout}
          />
          <div className="search-wrapper">
            <div className="container">
              <SearchBox>
                <i className="fas fa-search" />
                <input
                    className="form-control form-control-lg search-input"
                    id="search"
                    type="text"
                    placeholder="Dorm name or keyword"
                    onChange={(e) => this.setState({ searchTerm: e.target.value })}
                />
                <button
                    className="btn btn-primary search-btn"
                    onClick={this.search}
                >
                  <span className="search-btn-text">Search</span>
                </button>
              </SearchBox>
            </div>
          </div>

          <BuildingWrapper>
            <FilterList
                applyFilters={this.applyFilters}
            />
            <RightWrapper>
              <SortBar />
              <BuildingList buildings={this.props.buildings} profile={this.props.profile} />
            </RightWrapper>
          </BuildingWrapper>
        </div>
    );
  }
}

const dispatchToPropertyMapper = (dispatch) => ({
  getProfile: () => {
    userService.profile().then((actualProfile) => {
      if (actualProfile && actualProfile.username) {
        dispatch(profile(actualProfile, "user"));
      } else {
        staffService.profile().then((staffProfile) => {
          if (staffProfile && staffProfile.username) {
            dispatch(profile(staffProfile, "staff"));
          } else {
            dispatch(logout());
          }
        });
      }
    });
  },

  logout: () => {
    userService.logout().then(dispatch(logout()));
    staffService.logout()
  },

  findAllBuildings: () => {
    buildingService
        .findAllBuildings()
        .then((buildings) => dispatch(findAllBuildings(buildings)));
  },

  filterBuildings: (searchTerm, filters) => {
    buildingService
        .findAllBuildings()
        .then((buildings) =>
            dispatch(filterBuildings(buildings, searchTerm, filters))
        );
  },
});

const stateToPropertyMapper = (state) => ({
  profile: state.users.profile,
  loggedIn: state.users.loggedIn,
  buildings: state.buildings.buildings,
});

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(SearchContainer);
