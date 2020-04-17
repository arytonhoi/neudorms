import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeContainer from "./HomeContainer";
import ProfileContainer from "./ProfileContainer";
import SearchContainer from "./SearchContainer";
import DetailsContainer from "./DetailsContainer";
import LoginContainer from "./LoginContainer";
import BookmarksContainer from "./BookmarksContainer";
import RegistrationContainer from "./RegistrationContainer";

class AppRoutingContainer extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/home" component={HomeContainer} />
          <Route
              path="/profile/:username"
              exact={true}
              render={(props) =>
                  <ProfileContainer
                      {...props}
                      username={props.match.params.username}
                  />}
              component={ProfileContainer}
          />
          <Route path="/search" component={SearchContainer} />
          <Route
            path="/details/:buildingId"
            exact={true}
            render={(props) =>
              <DetailsContainer
                {...props}
                buildingId={props.match.params.buildingId}
              />}
            component={DetailsContainer}
          />
          <Route path="/login" component={LoginContainer} />
          <Route path="/bookmarks" component={BookmarksContainer} />
          <Route path="/registration" component={RegistrationContainer} />
        </Switch>
      </Router>
    )
  }
}

export default AppRoutingContainer;