import React from "react";
import { connect } from "react-redux";
import { profile, logout } from "../actions/UserActions";
import {
  sortBuildings,
  findAllBuildings,
  filterBuildings,
  clearBuildings,
} from "../actions/BuildingActions";
import { findAllReviews } from "../actions/ReviewActions";
import buildingService from "../services/BuildingService";
import BuildingList from "../components/home/BuildingList";
import FilterList from "../components/home/FilterList";
import SortBar from "../components/home/SortBar";
import "./HomeContainer.css";
import styled from "styled-components";
import userService from "../services/UserService";
import staffService from "../services/StaffService";
import NavBar from "../components/home/NavBar";
import CreateBuildingForm from "../components/home/CreateBuildingForm";
import $ from "jquery";
import { Link } from "react-router-dom";

const BuildingWrapper = styled.div`
  margin: 32px 60px 60px 60px;
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

const Header = styled.h1`
  font-weight: 900;
`;

const Footer = styled.div`
  height: 96px;
  background-color: #f0f3f7;
  padding: 12px 60px;
  display: flex;
  align-items: center;
  font-weight: 700;
  color: gray;
`;

class SearchContainer extends React.Component {
  state = {
    searchTerm: this.props.query,
    filters: {
      residentTypes: [],
      maxCost: 0,
      buildingTypes: [],
      roomTypes: [],
      amenities: [],
    },
  };

  componentDidMount() {
    this.props.getProfile();

    if (this.props.query) {
      this.setState({searchTerm: this.props.query})
      this.loadSearch();
    } else {
      this.setState({searchTerm: ""})
      this.props.findAllBuildings();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query && !this.props.query) {
      this.props.findAllBuildings();
    } else if (prevProps.query !== this.props.query) {
      this.setState({searchTerm: this.props.query})
      this.loadSearch();
    }
  }

  componentWillUnmount() {
    this.props.clearBuildings();
  }

  loadSearch = () => {
    this.props.filterBuildings(this.state.searchTerm, this.state.filters);
  }
  
  search = () => {
    if (this.state.searchTerm === "") {
      this.props.history.push("/search");
    } else {
      this.props.history.push(`/search/${this.state.searchTerm}`);
    }
  };

  applyFilters = (filters) => {
    this.props.filterBuildings(this.state.searchTerm, filters);
  };

  keyPressed = (event) => {
    if (event.key === "Enter") {
      this.search();
    }
  };

  render() {
    return (
      <div>
        <NavBar
          profile={this.props.profile}
          loggedIn={this.props.loggedIn}
          logout={this.props.logout}
          role={this.props.role}
        />
        <div className="search-wrapper d-none d-md-block">
          <div className="container">
            <SearchBox>
              <i className="fas fa-search" />
              <input
                className="form-control form-control-lg search-input"
                id="search"
                type="text"
                placeholder="Dorm name or keyword"
                onKeyPress={this.keyPressed}
                defaultValue={this.state.searchTerm}
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
          <FilterList applyFilters={this.applyFilters} />

          <RightWrapper>
            <SortBar
              buildings={this.props.buildings}
              searchTerm={this.props.query ? this.props.query : ""}
              applySort={this.props.applySort}
              numBuildings={this.props.buildings.length}
            />

            {this.props.role === "staff" && (
              <div>
                <CreateBuildingForm />
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    $(`#createBuildingModal`).modal("show");
                  }}
                  type="button"
                >
                  Create Building
                </button>
              </div>
            )}

            <BuildingList
              buildings={this.props.buildings}
              profile={this.props.profile}
            />
          </RightWrapper>
        </BuildingWrapper>
        <Footer>
          <span>
            Check out our{" "}
            <Link
              className="privacy"
              to="/privacy"
            >
              privacy policy.
            </Link>
          </span>
        </Footer>
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
    staffService.logout();
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

  findReviews: (buildingId) => {
    buildingService
      .findReviewsForBuilding(buildingId)
      .then((reviews) => dispatch(findAllReviews(reviews)));
  },

  applySort: (preference) => {
    buildingService
      .findAllBuildings()
      .then((buildings) => dispatch(sortBuildings(buildings, preference)));
  },

  clearBuildings: () => {
    dispatch(clearBuildings());
  },
});

const stateToPropertyMapper = (state) => ({
  profile: state.users.profile,
  role: state.users.role,
  loggedIn: state.users.loggedIn,
  buildings: state.buildings.buildings,
  reviews: state.reviews.reviews,
});

export default connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(SearchContainer);
