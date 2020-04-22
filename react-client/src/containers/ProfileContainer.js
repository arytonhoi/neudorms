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
import staffService from "../services/StaffService";
import reviewService from "../services/ReviewService";
import { deleteReview } from "../actions/ReviewActions";

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
    return (
      <div>
        <NavBar
          profile={this.props.profile}
          loggedIn={this.props.loggedIn}
          logout={() => {
            this.props.logout();
            this.props.history.push("/home")
          }}
          role={this.props.role}
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
                      profile={this.props.profile}
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
                      profile={this.props.profile}
                      deleteReview={this.props.deleteReview}
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
  deleteReview: (reviewId) => {
    reviewService.deleteReview(reviewId)
      .then(status => dispatch(deleteReview(reviewId)))
  }
});

const stateToPropertyMapper = (state) => ({
  profile: state.users.profile,
  loggedIn: state.users.loggedIn,
  role: state.users.role,
});

export default connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(ProfileContainer);
