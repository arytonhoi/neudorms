import React from "react";
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import buildingReducer from "../reducers/BuildingReducer";
import TextDetails from "../components/details/TextDetails";
import ImageDetails from "../components/details/ImageDetails";
import ReviewList from "../components/details/ReviewList";

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
        <div className='container'>
          <ImageDetails
            buildingId={this.state.buildingId}
          />
          <TextDetails
            buildingId={this.state.buildingId}
          />
          <br/>
          <h4>Reviews</h4>
          <ReviewList
            buildingId={this.state.buildingId}
          />
        </div>
      </Provider>

    )
  }
}

export default DetailsContainer