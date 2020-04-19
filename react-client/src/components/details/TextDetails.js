import React from "react";
import { connect } from "react-redux";
import { findBuildingById, updateBuilding, deleteBuilding } from '../../actions/BuildingActions';
import buildingService from '../../services/BuildingService';

class TextDetails extends React.Component {
  state = {
    building: this.props.building
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

export default connect(null, dispatchToPropertyMapper)
  (TextDetails)