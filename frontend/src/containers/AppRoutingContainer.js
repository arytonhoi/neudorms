import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeContainer from "./HomeContainer";
import ProfileContainer from "./ProfileContainer";
import SearchContainer from "./SearchContainer";
import DetailsContainer from "./DetailsContainer";
import LoginContainer from "./LoginContainer";

class AppRoutingContainer extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
            <Route path="/home" component={HomeContainer} />
            <Route path="/profile" component={ProfileContainer} />
            <Route path="/search" component={SearchContainer} />
            <Route path="/details" component={DetailsContainer} />
            <Route path="/login" component={LoginContainer} />
          </Switch>
      </Router>
    )
  }
}

export default AppRoutingContainer;