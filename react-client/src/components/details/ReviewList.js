import React from "react";
import { connect } from "react-redux";
import {
  findBuildingById,
  updateBuilding,
  deleteBuilding,
} from "../../actions/BuildingActions";
import buildingService from "../../services/BuildingService";
import "./details.css";
import styled from "styled-components";

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const ReviewBox = styled.div`
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  padding: 12px 24px;
  margin-bottom: 12px;
`;

const ReviewUser = styled.div`
  font-weight: 700;
  margin-bottom: 12px;
`;

const ReviewText = styled.div`
  font-size: 14px;
`;

const Sentiment = styled.div`
  color: gray;
  font-weight: 600;
`;

const ReviewHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

class ReviewList extends React.Component {
  render() {
    return (
      <div className="mb-5">
        <Title>Reviews</Title>
        {this.props.reviews.map((review) => (
          <ul className="list-group" key={review.id}>
            <ReviewBox className="card">
              <ReviewHeader>
                <ReviewUser>{review.username}</ReviewUser>
                <Sentiment>Sentiment: {review.sentiment}</Sentiment>
              </ReviewHeader>
              <ReviewText>
                {review.text}
              </ReviewText>
            </ReviewBox>
          </ul>
        ))
        }
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
