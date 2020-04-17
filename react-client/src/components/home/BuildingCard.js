import React from "react";
import { Link } from "react-router-dom";

class BuildingCard extends React.Component {

  state = {
    building: this.props.building
  }

  render() {
    return (
      <div className="card-container mt-3 mb-2 col-3 d-flex align-items-stretch">
        <div className="card">
          <Link className="card-link"
            to={`/details/${this.state.building.id}`}>
            <img
              className="card-img-top"
              src={this.state.building.thumbnailImageUrl}
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">{this.state.building.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Rating: 5/5</h6>
              <p className="card-text">
                Description
              </p>
              <a href="#" className="btn btn-primary mr-3">
                Bookmark
                </a>
            </div>
          </Link>
        </div>
      </div >
    );
  }
}

export default BuildingCard;
