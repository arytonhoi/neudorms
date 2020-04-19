import React from "react";
import { connect } from "react-redux";
import TextDetails from "../components/details/TextDetails";
import ImageDetails from "../components/details/ImageDetails";
import ReviewList from "../components/details/ReviewList";
import NavBar from "../components/home/NavBar";
import userService from "../services/UserService";
import { profile, logout } from "../actions/UserActions";
import buildingService from "../services/BuildingService";
import { findBuildingById } from "../actions/BuildingActions";

class DetailsContainer extends React.Component {
  componentDidMount() {
    this.props.getProfile();
    this.props.findBuildingById(this.props.match.params.buildingId);
  }

  render() {
    console.log(this.props.building);
    return (
      <div>
        <NavBar
          profile={this.props.profile}
          loggedIn={this.props.loggedIn}
          logout={this.props.logout}
        />
        {this.props.building && (
          <div>
            <ImageDetails building={this.props.building} />

            <div className="container">
              <TextDetails building={this.props.building} />
              <br />
              <ReviewList building={this.props.building} />
            </div>
          </div>
        )}
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
  findBuildingById: (buildingId) => {
    buildingService
      .findBuildingById(buildingId)
      .then((building) => dispatch(findBuildingById(building)));
  },
  logout: () => {
    userService.logout().then(dispatch(logout()));
  },
});

const stateToPropertyMapper = (state) => ({
  profile: state.users.profile,
  loggedIn: state.users.loggedIn,
  building: state.buildings.building,
});

export default connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(DetailsContainer);
