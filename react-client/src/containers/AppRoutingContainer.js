import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeContainer from "./HomeContainer";
import ProfileContainer from "./ProfileContainer";
import SearchContainer from "./SearchContainer";
import DetailsContainer from "./DetailsContainer";
import LoginContainer from "./LoginContainer";
import BookmarksContainer from "./BookmarksContainer";
import RegistrationContainer from "./RegistrationContainer";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import userReducer from "../reducers/UserReducer";
import buildingReducer from "../reducers/BuildingReducer";
import reviewReducer from "../reducers/ReviewReducer";
import ViewProfileContainer from "./ViewProfileContainer";
import pictureReducer from "../reducers/PictureReducer";

const rootReducer = combineReducers({
  users: userReducer,
  buildings: buildingReducer,
  reviews: reviewReducer,
  pictures: pictureReducer
});

let store = createStore(rootReducer);

class AppRoutingContainer extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/home" component={HomeContainer} />
            <Route
              path="/profile/:username"
              exact={true}
              render={(props) => (
                <ViewProfileContainer
                  {...props}
                  username={props.match.params.username}
                />
              )}
            />
            <Route
              path="/profile"
              exact={true}
              component={ProfileContainer}
            />
            <Route path="/search" component={SearchContainer} />
            <Route
              path="/details/:buildingId"
              // exact={true}
              // render={(props) => (
              //   <DetailsContainer
              //     {...props}
              //     buildingId={props.match.params.buildingId}
              //   />
              // )}
              component={DetailsContainer}
            />
            <Route path="/login" component={LoginContainer} />
            <Route path="/bookmarks" component={BookmarksContainer}/>
            <Route path="/register" component={RegistrationContainer} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default AppRoutingContainer;
