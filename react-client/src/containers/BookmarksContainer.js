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
        this.props.findBookmarksForUser(this.props.match.params.username);
    }

    render() {
        if (this.props.profile) {
            console.log("BOOKMARKS: " + this.props.profile.bookmarkedBuildings);

            return (
                <div>
                    <NavBar
                        profile={this.props.profile}
                        loggedIn={this.props.loggedIn}
                        logout={this.props.logout}
                    />
                    {this.props.profile.bookmarkedBuildings && (
                        <BuildingWrapper>
                        <RightWrapper>
                            <Header className="ml-3">My Bookmarks</Header>
                            <BuildingList buildings={this.props.profile.bookmarkedBuildings} profile={this.props.profile} />
                        </RightWrapper>
                    </BuildingWrapper>
                    )}
                    
                </div>
            );
        } else {
            return null;
        }
        // console.log("PROFILE: " + JSON.stringify(this.props.profile.username));
        // console.log("BUILDINGS: " + JSON.stringify(this.props.findBookmarksForUser(this.props.match.params.username)));

        // console.log("BUILDINGS START: ======================");
        // let buildings = this.props.findBookmarksForUser(this.props.profile.username);
        // // for (let i = 0; i < buildings.length; i ++) {
        // //     console.log(buildings[i]);
        // // }
        // console.log(buildings);
        // console.log("BUILDINGS END: ======================");

        
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
        // console.log("findBookmarksForUser: " + username);
        userService
            .findBookmarksForUser(username)
            .then((username) => dispatch(findBookmarksForUser(username)))
            .then(response => console.log("RESPONSE: " + JSON.stringify(response)));
    },
});

const stateToPropertyMapper = (state) => ({
    profile: state.users.profile,
    loggedIn: state.users.loggedIn,
    bookmarks: state.bookmarks
    // bookmarks: state.bookmarks.bookmarks
    // buildings: state.users.profile.bookmarks,
});

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(BookmarksContainer);

