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

                            {Object.keys(this.props.profile.bookmarkedBuildings).length === 0 && (
                                <p>No bookmarks</p>
                            )}
                        </RightWrapper>
                    </BuildingWrapper>
                    )}
                    
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
            if (actualProfile.username) {
                console.log(actualProfile);
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
)(BookmarksContainer);

