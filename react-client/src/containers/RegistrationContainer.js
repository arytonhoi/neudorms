import React from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import BuildingList from "../components/registration/RegistrationForm";
import buildingReducer from "../reducers/BuildingReducer";
import "./HomeContainer.css";

const rootReducer = combineReducers({
  buildings: buildingReducer,
});

let store = createStore(rootReducer);

class HomeContainer extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <HomeWrapper>
            <BuildingList />
          </HomeWrapper>
        </div>
      </Provider>
    );
  }
}

export default HomeContainer;
