import React from "react";
import { connect } from "react-redux";
import {
  findBuildingById,
  updateBuilding,
  deleteBuilding,
} from "../../actions/BuildingActions";
import buildingService from "../../services/BuildingService";
import "./details.css";
import 'bootstrap/js/dist/carousel';
import styled from "styled-components";

const CarouselWrapper = styled.div`
  max-height: 380px;
`;

class ImageDetails extends React.Component {
  state = {

  }
  
  render() {
    return (
      <CarouselWrapper>
        <div
          id="carouselExampleControls"
          class="carousel"
        >
          <div class="carousel-inner">
            {this.props.building.pictures && this.props.building.pictures.map((picture, index, pictures) => (
              <div className={index === 0 ? "carousel-item active" : "carousel-item"} key={index}>
                <img src={picture.url} class="col-12 col-md-6 col-lg-4 p-0" alt="..." />
                <img src={pictures[(index + 1) % pictures.length].url} class="d-none d-md-inline col-md-6 col-lg-4 p-0" alt="..." />
                <img src={pictures[(index + 2) % pictures.length].url} class="d-none d-lg-inline col-lg-4 p-0" alt="..." />
              </div>
            ))}
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </CarouselWrapper>
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

export default connect(null, dispatchToPropertyMapper)(ImageDetails);
