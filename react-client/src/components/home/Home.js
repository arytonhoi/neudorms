import React from "react";
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import BuildingCard from "./BuildingCard";
import BuildingList from "./BuildingList";
import buildingReducer from "../../reducers/BuildingReducer";

const rootReducer = combineReducers({
  buildings: buildingReducer
})

let store = createStore(rootReducer)

class Home extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <BuildingList />
          {/* <h2 className="col ml-3">First Year Dorms</h2>
          <div className="row col mx-auto">
            <BuildingCard />
            <BuildingCard />
            <BuildingCard />
            <BuildingCard />
            <BuildingCard />
            <BuildingCard />
            <BuildingCard />
            <BuildingCard />
          </div>

          <h2 className="col ml-3 mt-5">Second Year Dorms</h2>
          <div className="row col mx-auto">
            <BuildingCard />
            <BuildingCard />
            <BuildingCard />
            <BuildingCard />
            <BuildingCard />
            <BuildingCard />
            <BuildingCard />
            <BuildingCard />
          </div>

          <h2 className="col ml-3 mt-5">Upperclassmen Dorms</h2>
          <div className="row col mx-auto">
            <BuildingCard />
            <BuildingCard />
            <BuildingCard />
            <BuildingCard />
            <BuildingCard />
            <BuildingCard />
            <BuildingCard />
            <BuildingCard />
          </div>

          <h2 className="col ml-3 mt-5">Graduate Student Dorms</h2>
          <div className="row col mx-auto">
            <BuildingCard />
            <BuildingCard />
            <BuildingCard />
            <BuildingCard />
            <BuildingCard />
          </div>

          <h2 className="col ml-3 mt-5">Law Student Dorms</h2>
          <div className="row col mx-auto">
            <BuildingCard />
            <BuildingCard />
          </div> */}
        </div>
      </Provider>
    );
  }
}

export default Home;
