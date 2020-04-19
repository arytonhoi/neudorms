import React from "react";
import { connect } from "react-redux";
import {
  findBuildingById,
  updateBuilding,
  deleteBuilding,
} from "../../actions/BuildingActions";
import buildingService from "../../services/BuildingService";
import "./details.css";

class ReviewList extends React.Component {
  render() {
    return (
      <div>
        {this.props.building.reviews.map((review) => (
          <ul className="list-group" key={review.id}>
            <li className="list-group-item">
              <h4>{review.username}</h4>
              <p>{review.sentiment} review</p>
              <p>{review.text}</p>
            </li>
          </ul>
        ))}
      </div>
    );
  }
}

const dispatchToPropertyMapper = (dispatch) => ({
  findBuildingById: (buildingId) => {
    buildingService
      .findBuildingById(buildingId)
      .then((building) => dispatch(findBuildingById(building)));
  },

  // used by staff
  updateBuilding: (buildingId, building) => {
    buildingService
      .updateBuilding(buildingId, building)
      .then((status) => dispatch(updateBuilding(buildingId, building)));
  },

  // used by staff
  deleteBuilding: (buildingId) => {
    buildingService
      .deleteBuilding(buildingId)
      .then((status) => dispatch(deleteBuilding(buildingId)));
  },
});

export default connect(null, dispatchToPropertyMapper)(ReviewList);
