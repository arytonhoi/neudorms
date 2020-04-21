import React from "react";
import {connect, Provider} from "react-redux";
import BuildingList from "../components/home/BuildingList";
import "./HomeContainer.css";
import styled from "styled-components";
import NavBar from "../components/home/NavBar";
import userService from "../services/UserService";
import {findBookmarksForUser, logout, profile} from "../actions/UserActions";

const Header = styled.h1`
  font-weight: 900;
`;

const BuildingWrapper = styled.div`
  margin: 32px 60px;
  display: flex;
  flex-direction: row;
`;

const RightWrapper = styled.div`
  width: 100%;
`;

class BookmarksContainer extends React.Component {
    componentDidMount() {
        this.props.getProfile();
    }

    render() {
        return (
            <div>
                <NavBar
                    profile={this.props.profile}
                    loggedIn={this.props.loggedIn}
                    logout={this.props.logout}
                />
                <BuildingWrapper>
                    <RightWrapper>
                        <Header className="ml-3">My Bookmarks</Header>
                        <BuildingList buildings={this.props.buildings} profile={this.props.profile} />
                    </RightWrapper>
                </BuildingWrapper>
            </div>
        );
    }
}

const dispatchToPropertyMapper = (dispatch) => ({
    getProfile: () => {
        userService.profile().then((actualProfile) => {
            if (actualProfile.username) {
                console.log(actualProfile);
                dispatch(profile(actualProfile));
            }
        });
    },

    logout: () => {
        userService.logout().then(dispatch(logout()));
    },

    findBookmarksForUser: (username) => {
        userService
            .findBookmarksForUser(username)
            .then((username) => dispatch(findBookmarksForUser(username)));
    },
});

const stateToPropertyMapper = (state) => ({
    profile: state.users.profile,
    loggedIn: state.users.loggedIn,
    buildings: state.users.profile.bookmarks,
});

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(BookmarksContainer);

