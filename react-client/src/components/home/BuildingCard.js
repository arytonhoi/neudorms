import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import EditBuildingForm from "./EditBuildingForm";
import $ from "jquery";

class BuildingCard extends React.Component {
  state = {
    building: this.props.building,
  };

  render() {
    return (
      <div className={this.props.inProfile ? "card-container mt-3 mb-2 col col-xl-6 d-flex align-items-stretch" : "card-container mt-3 mb-2 col-6 col-xl-4 d-flex align-items-stretch"}>
        {this.props.building && (
          <EditBuildingForm building={this.props.building} />
        )}
        <div className="card">
          <Link className="card-link" to={`/details/${this.props.building.id}`}>
            <img
              className="card-img-top"
              src={this.props.building.thumbnailImageUrl}
              alt="Card image cap"
            />
          </Link>

          <div className="card-body">
            <h5 className="card-title">{this.props.building.name}</h5>
            {
              (this.props.building.rating <= 0) &&
              <h6 className="card-subtitle mb-2 text-muted">No reviews yet!</h6>
            }
            {
              (this.props.building.rating > 0) &&
              <h6 className="card-subtitle mb-2 text-muted">this.props.building.rating %</h6>
            }
            <p className="card-text">Description</p>
            <Link
              className="card-link"
              to={`/details/${this.props.building.id}`}
            >
              <button className="btn btn-outline-primary mr-3">Open</button>
            </Link>

            {this.props.role === "staff" && (
              <button
                className="btn btn-outline-secondary mr-3"
                onClick={() => {
                  $(`#editBuildingModal${this.props.building.id}`).modal("show");
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
  role: state.users.role
});

export default connect(
  stateToPropertyMapper
)(BuildingCard);
