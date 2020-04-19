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
import ReviewForm from "../components/details/ReviewForm";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
`;

class DetailsContainer extends React.Component {
  state = {
    writeReview: false
  }

  writeReview = () => {
    if (this.props.loggedIn) {
      this.setState({ writeReview: true })
    } else {
      alert("Log in to write a review")
    }
  }

  submitReview = () => {
    this.setState({
      writeReview: false
    })
    this.forceUpdate()
  }

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
              <ButtonWrapper>
                <button
                  className="btn btn-outline-primary mr-2 btn-sm"
                  onClick={this.writeReview}>
                  Write a Review
                </button>
                <button className="btn btn-outline-secondary mr-2 btn-sm">
                  Add Photo
                </button>
                <button className="btn btn-outline-secondary btn-sm">
                  Bookmark
                </button>
              </ButtonWrapper>
              <br />
              {
                this.state.writeReview && (
                  <div>
                    <ReviewForm
                      profile={this.props.profile}
                      building={this.props.building}
                      submitReview={this.submitReview}
                    />
                    <br />
                  </div>
                )
              }
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
