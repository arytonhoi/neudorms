import React from "react";
import { connect } from "react-redux";
import { findBuildingById, updateBuilding, deleteBuilding } from '../../actions/BuildingActions';
import buildingService from '../../services/BuildingService';

class TextDetails extends React.Component {
  componentDidMount() {
    this.props.findBuildingById(this.props.buildingId);
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if (prevProps.topicId !== this.props.topicId) {
  //     this.props.findWidgetsForTopic(this.props.topicId)
  //   }
  // }

  state = {
  }

  render() {
    return (
      <div>
        <h1>{this.props.building.name}</h1>
        Address: {this.props.building.address}
      </div>
    );
  }
}

const dispatchToPropertyMapper = (dispatch) => ({
  findBuildingById: (buildingId) => {
    buildingService.findBuildingById(buildingId)
      .then(building => dispatch(findBuildingById(building)))
  },

  // used by staff
  updateBuilding: (buildingId, building) => {
    buildingService.updateBuilding(buildingId, building)
      .then(status => dispatch(updateBuilding(buildingId, building)))
  },

  // used by staff
  deleteBuilding: (buildingId) => {
    buildingService.deleteBuilding(buildingId)
      .then(status => dispatch(deleteBuilding(buildingId)))
  }
})

const stateToPropertyMapper = (state) => {
  return {
    building: state.buildings.building
  }
}

export default connect(stateToPropertyMapper, dispatchToPropertyMapper)
  (TextDetails)