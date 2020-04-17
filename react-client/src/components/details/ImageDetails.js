import React from "react";
import { connect } from "react-redux";
import { findBuildingById, updateBuilding, deleteBuilding } from '../../actions/BuildingActions';
import buildingService from '../../services/BuildingService';
import './details.css';

class ImageDetails extends React.Component {
  componentDidMount() {
    this.props.findBuildingById(this.props.buildingId);
  }

  render() {
    return (
      <div>
        <img className='building-image' src={this.props.building.mainImageUrl} />
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
  (ImageDetails)