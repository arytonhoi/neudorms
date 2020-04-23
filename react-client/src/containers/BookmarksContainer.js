import React from "react";
import { connect, Provider } from "react-redux";
import BuildingList from "../components/home/BuildingList";
import "./HomeContainer.css";
import styled from "styled-components";
import NavBar from "../components/home/NavBar";
import userService from "../services/UserService";
import staffService from "../services/StaffService";
import { findBookmarksForUser, logout, profile } from "../actions/UserActions";

const RightWrapper = styled.div`
  width: 100%;
`;

const Header = styled.h1`
  font-weight: 700;
  font-size: 28px;
  margin-top: 32px;
`;

const BuildingWrapper = styled.div`
  margin: 32px 60px 32px 60px;
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

class BookmarksContainer extends React.Component {
  state = {
    searchTerm: "",
  };

  componentDidMount() {
    this.props.getProfile();
    if (this.props.profile.username) {
      this.props.findBookmarksForUser(this.props.profile.username);
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.profile.username && this.props.profile.username) {
      this.props.findBookmarksForUser(this.props.profile.username);
    }
  }

  search = () => {
    if (this.state.searchTerm === "") {
      this.props.history.push("/search");
    } else {
      this.props.history.push(`/search/${this.state.searchTerm}`);
    }
  };

  keyPressed = (event) => {
    if (event.key === "Enter") {
      this.search();
    }
  };

  render() {
    if (this.props.profile) {
      console.log("BOOKMARKS: " + this.props.profile.bookmarkedBuildings);

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

          {this.props.bookmarks && this.props.bookmarks.length > 0 && (
            <BuildingWrapper>
              <Header>My Bookmarks</Header>
              <RightWrapper>
                <BuildingList
                  buildings={this.props.bookmarks}
                  profile={this.props.profile}
                />
              </RightWrapper>
            </BuildingWrapper>
          )}

          {Object.keys(this.props.bookmarks).length === 0 && (
            <BuildingWrapper>
              <Header>No Bookmarks</Header>
            </BuildingWrapper>
          )}
        </div>
      );
    } else {
      return null;
    }
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
  findBookmarksForUser: (username) => {
    userService
      .findBookmarksForUser(username)
      .then((bookmarks) => dispatch(findBookmarksForUser(bookmarks)));
  },
  logout: () => {
    userService.logout().then(dispatch(logout()));
    staffService.logout();
  },
});

const stateToPropertyMapper = (state) => ({
  profile: state.users.profile,
  loggedIn: state.users.loggedIn,
  role: state.users.role,
  bookmarks: state.users.bookmarks,
});

export default connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(BookmarksContainer);
