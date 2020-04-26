import React from "react";
import LoginForm from "../components/registration/LoginForm";
import NavBar from "../components/home/NavBar";
import { connect, Provider } from "react-redux";
import { findBookmarksForUser, logout, profile } from "../actions/UserActions";
import userService from "../services/UserService";
import staffService from "../services/StaffService";
import styled from "styled-components";

const Header = styled.h1`
  font-weight: 700;
  font-size: 28px;
  margin-top: 32px;
`;

const BuildingWrapper = styled.div`
  /* margin: 32px 60px 32px 60px; */
`;

const Summary = styled.div`
  font-weight: 400;
  font-style: italic;
  margin-top: 16px;
`;

const Body = styled.div`
  font-weight: 500;
  margin-top: 24px;
`;

const List = styled.div`
  margin-top: 16px;
  font-weight: 500;
`;

class PrivacyContainer extends React.Component {
  render() {
    return (
      <div>
        <NavBar
          profile={this.props.profile}
          loggedIn={this.props.loggedIn}
          logout={this.props.logout}
          role={this.props.role}
        />

        <BuildingWrapper className="container">
          <Header>Our Privacy Policy</Header>
          <Summary>
            Summary: NeuDorms will not store any of your information if you do not create an account. If you are registered and choose to post reviews, 
            however, you will be submitting information to us that is publicly available and reveals where you have previously lived and where you intend to live.
          </Summary>
          <Body>
            NeuDorms was built to give Northeastern Students a better way to explore and select their housing options. 
            Quality of service these days is largely based on customer satisfaction - think of Amazon, AirBnb, and Yelp. 
            That’s why we allow students to post reviews of their past dorms - to give potential future residents a more transparent view of their options. 
            Similarly, we are dedicated to respecting students’ privacy and personal information by providing transparency into our privacy practices.
          </Body>
          <List>
            <ul>
              <li className="mb-2">If you register on our website, we will collect information about their Husky email, major, and school seniority. This information is only used to build a stronger sense of community and identity on our website between student users.</li>
              <li className="mb-2">If you choose to post reviews, information about where you have previously lived will be available to the public. Similarly, any pictures you post will be available for everyone to see. Posting reviews is entirely optional and while your reviews may help other students with housing selection, we want you to understand that you will also be broadcasting your opinions and pictures to the public.</li>
              <li className="mb-2">Additionally, your reviews will be sent over to Google to be analyzed for sentiment. This sentiment data helps us to automatically give dorms ratings based on your review. However, this also means that you will be sending information to a large corporation that profits off using your data to personalize advertisements.</li>
              <li>Finally, if you choose to bookmark any buildings, we will store that information for your use. This data will not be intentionally public; however, anyone with access will know where you may be considering to live.</li>
            </ul>
          </List>
          <Body>
            We cannot guarantee that your data will be safely stored since we do not have the funding to implement advanced encryption and security into our website and its services. 
            The majority of our services can be used without registering and without giving us any of your information. That said, our website relies heavily on student reviews, 
            and while we would greatly appreciate any and all contributions in the form of reviews, we want you to understand the implications.
          </Body>
        </BuildingWrapper>
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
)(PrivacyContainer);
