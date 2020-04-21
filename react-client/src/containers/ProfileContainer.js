import React from "react";
import { connect } from "react-redux";
import ReviewList from "../components/details/ReviewList";
import NavBar from "../components/home/NavBar";
import userService from "../services/UserService";
import { profile, logout } from "../actions/UserActions";
import styled from "styled-components";
import "bootstrap/js/dist/modal";
import ProfileComponent from "../components/profile/ProfileComponent";
import BuildingList from "../components/home/BuildingList";

const Container = styled.div`
  margin-left: 60px;
  margin-right: 60px;
`;

const Wrapper = styled.div`
  padding-top: 24px;
`;

const Header = styled.div`
  font-size: 38px;
  font-weight: bold;
  letter-spacing: 1.1px;
  line-height: 50px;
`;

class ProfileContainer extends React.Component {
  componentDidMount() {
    this.props.getProfile();
  }

  render() {
    if (this.props.profile) {
      return (
        <div>
          <NavBar
            profile={this.props.profile}
            loggedIn={this.props.loggedIn}
            logout={this.props.logout}
          />
          <Container>
            <Wrapper className="row">
              <ProfileComponent profile={this.props.profile} />
              <div className="col">
                {this.props.profile.bookmarkedBuildings &&
                  this.props.profile.bookmarkedBuildings.length > 0 && (
                    <div className="mb-5">
                      <Header>Bookmarks</Header>
                      <hr />
                      <BuildingList
                        buildings={this.props.profile.bookmarkedBuildings}
                        inProfile={true}
                      />
                    </div>
                  )}
                {this.props.profile.reviews &&
                  this.props.profile.reviews.length > 0 && (
                    <div>
                      <Header>Reviews</Header>
                      <hr />
                      <ReviewList
                        reviews={this.props.profile.reviews}
                        inProfile={true}
                      />
                    </div>
                  )}
              </div>
            </Wrapper>
          </Container>
        </div>
      );
    }
  }
}

const dispatchToPropertyMapper = (dispatch) => ({
  getProfile: () => {
    userService.profile().then((actualProfile) => {
      if (actualProfile) {
        dispatch(profile(actualProfile));
      }
    });
  },
  logout: () => {
    userService.logout().then(dispatch(logout()));
  },
});

const stateToPropertyMapper = (state) => ({
  profile: state.users.profile,
  loggedIn: state.users.loggedIn,
});

export default connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(ProfileContainer);
