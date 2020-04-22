import React from "react";
import { connect } from "react-redux";
import ReviewList from "../components/details/ReviewList";
import NavBar from "../components/home/NavBar";
import userService from "../services/UserService";
import { profile, logout, findUserByUsername } from "../actions/UserActions";
import styled from "styled-components";
import "bootstrap/js/dist/modal";
import BuildingList from "../components/home/BuildingList";
import ViewProfileComponent from "../components/profile/ViewProfileComponent";
import staffService from "../services/StaffService";

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

class ViewProfileContainer extends React.Component {
  componentDidMount() {
    this.props.getProfile();

    if (this.props.username) {
      this.props.getUser(this.props.username);
      console.log("trueeee");
      console.log(this.props.user);
    }
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if (prevProps.profile) {
  //     this.forceUpdate()
  //   }
  // }

  render() {
    if (this.props.user) {
      return (
        <div>
          {this.props.profile && (
            <NavBar
              profile={this.props.profile}
              loggedIn={this.props.loggedIn}
              logout={this.props.logout}
              role={this.props.role}
            />
          )}
          {!this.props.profile && (
            <NavBar loggedIn={this.props.loggedIn} logout={this.props.logout} />
          )}
          <Container>
            <Wrapper className="row">
              <ViewProfileComponent
                profile={this.props.user}
                username={this.props.username}
              />
              <div className="col">
                {this.props.user.bookmarkedBuildings &&
                  this.props.user.bookmarkedBuildings.length > 0 && (
                    <div className="mb-5">
                      <Header>Bookmarks</Header>
                      <hr />
                      <BuildingList
                        buildings={this.props.user.bookmarkedBuildings}
                        inProfile={true}
                      />
                    </div>
                  )}
                {this.props.user.reviews && this.props.user.reviews.length > 0 && (
                  <div>
                    <Header>Reviews</Header>
                    <hr />
                    <ReviewList
                      reviews={this.props.user.reviews}
                      inProfile={true}
                    />
                  </div>
                )}
              </div>
            </Wrapper>
          </Container>
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
  getUser: (username) => {
    userService.findUserByUsername(username).then((user) => {
      dispatch(findUserByUsername(user));
    });
  },
  logout: () => {
    userService.logout().then(dispatch(logout()));
    staffService.logout()
  },
});

const stateToPropertyMapper = (state) => ({
  profile: state.users.profile,
  loggedIn: state.users.loggedIn,
  user: state.users.user,
  role: state.users.role
});

export default connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(ViewProfileContainer);
