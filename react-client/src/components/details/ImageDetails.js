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
            <div class="carousel-item active">
              <img src={this.props.building.mainImageUrl} class="col-4 p-0" alt="..." />
              <img src="https://i.ytimg.com/vi/NTwTXX48DTM/maxresdefault.jpg" class="col-4 p-0" alt="..." />
              <img src="https://66.media.tumblr.com/cd067920739906913f394161b8e16612/tumblr_o330ta0JAx1v9q01co1_1280.jpg" class="col-4 p-0" alt="..." />
            </div>
            <div class="carousel-item">
              <img src="https://i.ytimg.com/vi/NTwTXX48DTM/maxresdefault.jpg" class="col-4 p-0" alt="..." />
              <img src="https://66.media.tumblr.com/cd067920739906913f394161b8e16612/tumblr_o330ta0JAx1v9q01co1_1280.jpg" class="col-4 p-0" alt="..." />
              <img src={this.props.building.mainImageUrl} class="col-4 p-0" alt="..." />
            </div>
            <div class="carousel-item">
              <img src="https://66.media.tumblr.com/cd067920739906913f394161b8e16612/tumblr_o330ta0JAx1v9q01co1_1280.jpg" class="col-4 p-0" alt="..." />
              <img src={this.props.building.mainImageUrl} class="col-4 p-0" alt="..." />
              <img src="https://i.ytimg.com/vi/NTwTXX48DTM/maxresdefault.jpg" class="col-4 p-0" alt="..." />
            </div>
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
