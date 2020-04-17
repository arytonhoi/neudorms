import React from "react";
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import buildingReducer from "../reducers/BuildingReducer";
import TextDetails from "../components/details/TextDetails";

const rootReducer = combineReducers({
  buildings: buildingReducer
})

let store = createStore(rootReducer)

class DetailsContainer extends React.Component {
  state = {
    buildingId: this.props.match.params.buildingId
  }

  render() {
    return (
      <Provider store={store}>
        <h1>Details page for building {this.state.buildingId}</h1>
        <TextDetails
          buildingId={this.state.buildingId}
        />
      </Provider>
    )
  }
}

export default DetailsContainer