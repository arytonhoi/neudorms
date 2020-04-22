import React from "react";
import { connect } from "react-redux";
import { profile, logout } from "../actions/UserActions";
import {
  sortBuildings,
  findAllBuildings,
  filterBuildings,
  highestRated,
} from "../actions/BuildingActions";
import {
  findRecentReviews,
  findAllReviews,
  findRecentUserReviews,
} from "../actions/ReviewActions";
import buildingService from "../services/BuildingService";
import BuildingList from "../components/home/BuildingList";
import "./HomeContainer.css";
import styled from "styled-components";
import userService from "../services/UserService";
import staffService from "../services/StaffService";
import NavBar from "../components/home/NavBar";
import ReviewList from "../components/details/ReviewList";
import ReviewService from "../services/ReviewService";

const ReviewWrapper = styled.div`
  margin: 32px 60px 32px 60px;
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
  font-weight: 700;
  font-size: 28px;
  margin-top: 32px;
`;

const Footer = styled.footer`
  flex-shrink: 0;
  width: 100%;
  height: 96px;
  background-color: #f0f3f7;
  padding: 0px 60px;
  display: flex;
  align-items: center;
  font-weight: 700;
  color: gray;
`;

const Body = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  flex: 1 0 auto;
  margin-bottom: 12px;
`;

class HomeContainer extends React.Component {
  componentDidMount() {
    this.props.getProfile();
    this.props.findBestBuildings();
    this.props.findRecentReviews();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.role && this.props.role === "user") {
      this.props.findRecentUserReviews(this.props.profile.username);
    }
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
    this.props.history.push("/search");
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
      <Body>
        <Wrapper>
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
                  onChange={(e) =>
                    this.setState({ searchTerm: e.target.value })
                  }
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

          <ReviewWrapper>
            <Header>Top Rated Dorms</Header>
            <RightWrapper>
              <BuildingList buildings={this.props.buildings} topRated={true} />
            </RightWrapper>
          </ReviewWrapper>

          {this.props.role === "user" && this.props.userReviews.length > 0 && (
            <ReviewWrapper>
              <Header>My Recent Reviews</Header>
              <RightWrapper>
                <ReviewList inHome={true} reviews={this.props.userReviews} />
              </RightWrapper>
            </ReviewWrapper>
          )}

          {this.props.reviews.length > 0 && (
            <ReviewWrapper>
              <Header>Recent Reviews</Header>
              <RightWrapper>
                <ReviewList inHome={true} reviews={this.props.reviews} />
              </RightWrapper>
            </ReviewWrapper>
          )}
        </Wrapper>
        <Footer>
          <span>
            Check out our{" "}
            <a
              className="privacy"
              href="https://docs.google.com/document/d/1kXHBNsuqeXzpO41KTajtD32bEl5Sh7KnC3b4SC6XOv4/edit"
            >
              privacy policy.
            </a>
          </span>
        </Footer>
      </Body>
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

  findRecentReviews: () => {
    ReviewService.findAllReviews().then((reviews) =>
      dispatch(findRecentReviews(reviews))
    );
  },

  findRecentUserReviews: (username) => {
    ReviewService.findReviewsByUser(username).then((reviews) => {
      dispatch(findRecentUserReviews(reviews));
    });
  },

  findBestBuildings: () => {
    buildingService
      .findAllBuildings()
      .then((buildings) => dispatch(highestRated(buildings)));
  },
});

const stateToPropertyMapper = (state) => ({
  profile: state.users.profile,
  role: state.users.role,
  loggedIn: state.users.loggedIn,
  buildings: state.buildings.buildings,
  reviews: state.reviews.reviews,
  userReviews: state.reviews.userReviews,
});

export default connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(HomeContainer);
