import React from "react";
import BuildingCard from "./BuildingCard";
import buildingService from '../../services/BuildingService';

class BuildingList extends React.Component {
  render() {
    return (
    );
  }
}

const dispatchToPropertyMapper = (dispatch) => ({
  findAllBuildings: () => {
    buildingService.findAllBuildings()
      .then(buildings => dispatch(findAllBuildings(buildings)))
  },

  createBuilding: (building) => {
    buildingService.createBuilding(building)
      .then(building => dispatch(createBuilding(building)))
  },

  updateBuilding: (buildingId, building) => {
    buildingService.updateBuilding(buildingId, building)
      .then(status => dispatch.updateBuilding(buildingId, building))
  },
  
  deleteBuilding: (buildingId) => {
    buildingService.deleteBuilding(buildingId)
      .then(status => dispatch(deleteBuilding(buildingId)))
  }
})

const stateToPropertyMapper = (state) => ({
  widgets: state.widgets.widgets
})

export default Home;
