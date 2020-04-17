import React from "react";
import { connect } from "react-redux";
import { findAllBuildings, createBuilding, updateBuilding, deleteBuilding } from '../../actions/BuildingActions';
import buildingService from '../../services/BuildingService';
import BuildingCard from "./BuildingCard";

class BuildingList extends React.Component {
  componentDidMount() {
    this.props.findAllBuildings();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // if (prevProps.topicId !== this.props.topicId) {
    //   this.props.findWidgetsForTopic(this.props.topicId)
    // }
  }

  state = {
  }

  render() {
    return (
      <div>
        {
          this.props.buildings.map(building =>
            <ul
              key={building.id}
            >
              <BuildingCard
                key={building.id}
                building={building}
              />
            </ul>
          )
        }
      </div>
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
      .then(status => dispatch(updateBuilding(buildingId, building)))
  },

  deleteBuilding: (buildingId) => {
    buildingService.deleteBuilding(buildingId)
      .then(status => dispatch(deleteBuilding(buildingId)))
  }
})

const stateToPropertyMapper = (state) => ({
  buildings: state.buildings.buildings
})

export default connect(stateToPropertyMapper, dispatchToPropertyMapper)
  (BuildingList)