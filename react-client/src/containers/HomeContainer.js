import React from "react";
import { connect } from "react-redux";
import { profile, logout } from "../actions/UserActions";
import { sortBuildings, findAllBuildings, filterBuildings } from "../actions/BuildingActions";
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

class HomeContainer extends React.Component {
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
      amenities: [],
    },
  };

  search = () => {
    this.props.filterBuildings(this.state.searchTerm, this.state.filters);
  };

  applyFilters = (filters) => {
    this.props.filterBuildings(this.state.searchTerm, filters);
  };

  keyPressed = (event) => {
    if (event.key === "Enter") {
      this.search();
    }
  }

  render() {
    console.log("ROLE: " + this.props.role);
    return (
      <div>
        <NavBar
          profile={this.props.profile}
          loggedIn={this.props.loggedIn}
          logout={this.props.logout}
          role={this.props.role}
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
                onKeyPress={this.keyPressed}
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
            {/*{this.props.loggedIn && (*/}
            {/*    <div>*/}
            {/*      <Header>My Recent Bookmarks</Header>*/}
            {/*      /!*MOST RECENT BOOKMARKS HERE*!/*/}
            {/*      <p>MOST RECENT BOOKMARKS HERE</p>*/}
            {/*      <Header>My Recent Reviews</Header>*/}
            {/*      /!*MOST RECENT REVIEWS HERE*!/*/}
            {/*      <p>MOST RECENT REVIEWS HERE</p>*/}
            {/*    </div>*/}
            {/*)}*/}

            <SortBar 
              buildings={this.props.buildings}
              searchTerm={this.state.searchTerm}
              applySort={this.props.applySort}
              numBuildings={this.props.buildings.length}
              />
            <BuildingList
              buildings={this.props.buildings}
              profile={this.props.profile}
            />
          </RightWrapper>
        </BuildingWrapper>
        <Footer>
          <span>Check out our  <a className="privacy" href="https://docs.google.com/document/d/1kXHBNsuqeXzpO41KTajtD32bEl5Sh7KnC3b4SC6XOv4/edit">privacy policy.</a></span>
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
    buildingService.findReviewsForBuilding(buildingId)
      .then(reviews => dispatch(findAllReviews(reviews)))
  },

  applySort: (preference) => {
    buildingService
    .findAllBuildings()
    .then((buildings) =>
      dispatch(sortBuildings(buildings, preference))
    );
  }
});

const stateToPropertyMapper = (state) => ({
  profile: state.users.profile,
  role: state.users.role,
  loggedIn: state.users.loggedIn,
  buildings: state.buildings.buildings,
  reviews: state.reviews.reviews
});

export default connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(HomeContainer);
