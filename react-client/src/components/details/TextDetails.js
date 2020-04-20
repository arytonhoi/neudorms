import React from "react";
import { connect } from "react-redux";
import {
  findBuildingById,
  updateBuilding,
  deleteBuilding,
} from "../../actions/BuildingActions";
import buildingService from "../../services/BuildingService";
import styled from "styled-components";

const Header = styled.div`
  font-size: 38px;
  font-weight: bold;
  letter-spacing: 1.1px;
  line-height: 50px;
  padding-top: 24px;
`;

const Address = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AddressText = styled.div`
  font-size: 14px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 12px;
`;

const Section = styled.div`
  margin-right: 48px;
  min-width: 124px;
`;

const Subtitle = styled.div`
  color: gray;
  font-size: 14px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Text = styled.div`
  font-size: 16px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
`;

class TextDetails extends React.Component {
  state = {
    building: this.props.building,
  };

  render() {
    return (
      <div>
        <Header>{this.props.building.name}</Header>
        <Address>
          <i class="fas fa-map-marker-alt ml-1 mr-2"></i>
          <AddressText>{this.props.building.address}</AddressText>
        </Address>
        <ButtonWrapper>
          <button
            className="btn btn-outline-primary mr-2 btn-sm"
            onClick={this.props.writeReview}
          >
            Write a Review
          </button>
          <button
            className="btn btn-outline-secondary mr-2 btn-sm"
            onClick={this.props.addPhoto}
          >
            Add Photo
          </button>
          <button className="btn btn-outline-secondary btn-sm">Bookmark</button>
        </ButtonWrapper>
        <hr />
        <div className="mb-2 mt-2">
          <Title>Building Information</Title>
          <Body>
            <Section>
              <Subtitle>Cost</Subtitle>
              <Text>${this.props.building.minimumCost} /month</Text>
            </Section>
            <Section>
              <Subtitle>Resident Types</Subtitle>
              <Text>{this.props.building.residentTypes}</Text>
            </Section>
            <Section>
              <Subtitle>Building Type</Subtitle>
              <Text>{this.props.building.buildingType}</Text>
            </Section>
            <Section>
              <Subtitle>Room Types</Subtitle>
              <Text>{this.props.building.roomTypes}</Text>
            </Section>
            <Section>
              <Subtitle>Amenities</Subtitle>
              <Text>{this.props.building.amenities}</Text>
            </Section>
          </Body>
        </div>
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

export default connect(null, dispatchToPropertyMapper)(TextDetails);
