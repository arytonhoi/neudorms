import React from "react";
import { connect } from "react-redux";
import ReviewList from "../components/details/ReviewList";
import NavBar from "../components/home/NavBar";
import userService from "../services/UserService";
import { profile, logout, findBookmarksForUser } from "../actions/UserActions";
import styled from "styled-components";
import "bootstrap/js/dist/modal";
import ProfileComponent from "../components/profile/ProfileComponent";
import BuildingList from "../components/home/BuildingList";
import staffService from "../services/StaffService";
import reviewService from "../services/ReviewService";
import { deleteReview, findAllReviews, clearReviews } from "../actions/ReviewActions";

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

    if (this.props.profile.username) {
      this.props.findReviewsForUser(this.props.profile.username);
      this.props.findBookmarksForUser(this.props.profile.username);
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.profile.username && this.props.profile.username) {
      this.props.findReviewsForUser(this.props.profile.username);
      this.props.findBookmarksForUser(this.props.profile.username);
    }
  }

  componentWillUnmount() {
    this.props.clearReviews();
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
            <div className="col-12 col-lg">
              {this.props.bookmarks &&
                this.props.bookmarks.length > 0 && (
                  <div className="mb-5">
                    <Header>Bookmarks</Header>
                    <hr />
                    <BuildingList
                      buildings={this.props.bookmarks}
                      inProfile={true}
                      profile={this.props.profile}
                    />
                  </div>
                )}
              {this.props.reviews &&
                this.props.reviews.length > 0 && (
                  <div>
                    <Header>Reviews</Header>
                    <hr />
                    <ReviewList
                      reviews={this.props.reviews}
                      inProfile={true}
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
  },
  findReviewsForUser: (username) => {
    reviewService.findReviewsByUser(username)
      .then((reviews) => dispatch(findAllReviews(reviews)))
  },
  clearReviews: () => {
    dispatch(clearReviews());
  },
  findBookmarksForUser: (username) => {
    userService.findBookmarksForUser(username)
      .then((bookmarks) => dispatch(findBookmarksForUser(bookmarks)))
  }
});

const stateToPropertyMapper = (state) => ({
  profile: state.users.profile,
  loggedIn: state.users.loggedIn,
  role: state.users.role,
  reviews: state.reviews.reviews,
  bookmarks: state.users.bookmarks
});

export default connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(ProfileContainer);
