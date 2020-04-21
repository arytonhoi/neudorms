import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import EditBuildingForm from "./EditBuildingForm";
import $ from "jquery";

class BuildingCard extends React.Component {
  state = {
    building: this.props.building,
  };

  submitUpdate(buildingId) {
    $(`#editBuildingModal${buildingId}`).modal("hide");
  }

  render() {
    return (
      <div className={this.props.inProfile ? "card-container mt-3 mb-2 col col-xl-6 d-flex align-items-stretch" : "card-container mt-3 mb-2 col-6 col-xl-4 d-flex align-items-stretch"}>
        {this.state.building && (
          <EditBuildingForm building={this.state.building} submitUpdate={this.submitUpdate}/>
        )}
        <div className="card">
          <Link className="card-link" to={`/details/${this.state.building.id}`}>
            <img
              className="card-img-top"
              src={this.state.building.thumbnailImageUrl}
              alt="Card image cap"
            />
          </Link>

          <div className="card-body">
            <h5 className="card-title">{this.state.building.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">Rating: 5/5</h6>
            <p className="card-text">Description</p>
            <Link
              className="card-link"
              to={`/details/${this.state.building.id}`}
            >
              <button className="btn btn-outline-primary mr-3">Open</button>
            </Link>

            {/* Right now the edit button displays as long as you're logged in for testing purpsoses, 
            but need to switch to only displaying on admin users in future. */}
            {this.props.profile && this.props.profile.username && (
              <button
                className="btn btn-outline-secondary mr-3"
                onClick={() => {
                  $(`#editBuildingModal${this.state.building.id}`).modal("show");
                }}
                type="button"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const stateToPropertyMapper = (state) => ({
  profile: state.users.profile,
  loggedIn: state.users.loggedIn,
  buildings: state.buildings.buildings,
});

export default connect(
  stateToPropertyMapper
)(BuildingCard);
