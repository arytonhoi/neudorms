import React from "react";
import { connect } from "react-redux";
import {
  profile,
  logout
} from "../actions/UserActions";
import BuildingList from "../components/home/BuildingList";
import "./HomeContainer.css";
import styled from "styled-components";
import userService from "../services/UserService";
import NavBar from "../components/home/NavBar";

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
  componentDidMount() {
    this.props.getProfile();
    console.log(this.props.profile);
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

const dispatchToPropertyMapper = (dispatch) => ({
  getProfile: () => {
    userService.profile().then((actualProfile) => {
      if (actualProfile.username) {
        console.log(actualProfile)
        dispatch(profile(actualProfile));
      }
    });
  },
  logout: () => {
    userService.logout().then(dispatch(logout()))
  }
});

const stateToPropertyMapper = (state) => ({
  profile: state.users.profile,
  loggedIn: state.users.loggedIn
});

export default connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(HomeContainer);
