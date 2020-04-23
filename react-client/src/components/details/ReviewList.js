import React from "react";
import "./details.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { profile, logout } from "../../actions/UserActions";
import userService from "../../services/UserService";

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const ReviewBox = styled.div`
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  padding: 16px 24px;
  margin-bottom: 12px;
  width: 100%;
`;

const ReviewUser = styled.div`
  color: gray;
`;

const ReviewBuilding = styled.div`
  font-weight: 600;
`;

const ReviewText = styled.div`
  font-size: 14px;
`;

const Sentiment = styled.div`
  color: gray;
  font-weight: 500;
  margin-bottom: 12px;
`;

const NegativeSentiment = styled.div`
  color: red;
  font-weight: 500;
  margin-bottom: 12px;
`;

const PositiveSentiment = styled.div`
  color: green;
  font-weight: 500;
  margin-bottom: 12px;
`;

const ReviewHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

class ReviewList extends React.Component {
  state = {
    filter: "All Reviews",
  };

  render() {
    if (this.props.inHome) {
      return (
        <div>
          <div className="row mt-4">
            {this.props.reviews.map((review) => (
              <div className="mb-2 col-3 d-flex align-items-stretch">
                <ReviewBox className="card" key={review.id}>
                  <ReviewHeader>
                    <div>
                      <ReviewBuilding>
                        <Link
                          className="link"
                          to={`/details/${review.referencedBuildingId}`}
                        >
                          {review.buildingName}
                        </Link>
                      </ReviewBuilding>
                      {review.sentiment > 0.1 && (
                        <PositiveSentiment>Positive Review</PositiveSentiment>
                      )}
                      {review.sentiment < -0.1 && (
                        <NegativeSentiment>Negative Review</NegativeSentiment>
                      )}
                      {review.sentiment >= -0.1 && review.sentiment <= 0.1 && (
                        <Sentiment>Neutral Review</Sentiment>
                      )}
                    </div>
                    <ReviewUser>
                      <div>
                        {new Date(review.date).toLocaleDateString("en-US", {
                          timeZone: "UTC",
                        })}
                      </div>
                      <Link className="link" to={`/profile/${review.username}`}>
                        {review.name}
                      </Link>
                    </ReviewUser>
                  </ReviewHeader>
                  <ReviewText>{review.text}</ReviewText>
                  {this.props.profile && this.props.profile.username === review.username &&
                  <button className='btn btn-outline-danger btn-delete btn-sm mt-3'
                    onClick={() => this.props.deleteReview(review.id)}
                  >
                    Delete Review
                  </button>
                }
                </ReviewBox>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="mb-5">
        {!this.props.inProfile && (
          <div className="d-flex justify-content-between">
            <Title>Reviews</Title>
            <div class="float-right dropdown">
              <a
                class="dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {this.state.filter}
              </a>

              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a
                  class="dropdown-item"
                  href="#"
                  onClick={() => {
                    this.setState({ filter: "All Reviews" });
                    this.props.filter(this.props.buildingId, "");
                  }}
                >
                  All Reviews
                </a>
                <a
                  class="dropdown-item"
                  href="#"
                  onClick={() => {
                    this.setState({ filter: "Positive Reviews" });
                    this.props.filter(this.props.buildingId, "positive");
                  }}
                >
                  Positive Reviews
                </a>
                <a
                  class="dropdown-item"
                  href="#"
                  onClick={() => {
                    this.setState({ filter: "Negative Reviews" });
                    this.props.filter(this.props.buildingId, "negative");
                  }}
                >
                  Negative Reviews
                </a>
              </div>
            </div>
          </div>
        )}

        {this.props.reviews.map((review) => (
          <ul className="list-group" key={review.id}>
            <ReviewBox className="card">
              <ReviewHeader>
                <div>
                  <ReviewBuilding>
                    <Link
                      className="link"
                      to={`/details/${review.referencedBuildingId}`}
                    >
                      {review.buildingName}
                    </Link>
                  </ReviewBuilding>
                  {review.sentiment > 0.1 && (
                    <PositiveSentiment>Positive Review</PositiveSentiment>
                  )}
                  {review.sentiment < -0.1 && (
                    <NegativeSentiment>Negative Review</NegativeSentiment>
                  )}
                  {review.sentiment >= -0.1 && review.sentiment <= 0.1 && (
                    <Sentiment>Neutral Review</Sentiment>
                  )}
                </div>
                <ReviewUser>
                  <div>
                    {new Date(review.date).toLocaleDateString("en-US", {
                      timeZone: "UTC",
                    })}
                  </div>
                  <Link className="link" to={`/profile/${review.username}`}>
                    {review.name}
                  </Link>
                </ReviewUser>
              </ReviewHeader>
              <ReviewText>{review.text}</ReviewText>
              {this.props.profile && this.props.profile.username === review.username &&
                  <button className='btn btn-outline-danger btn-delete btn-sm mt-3'
                    onClick={() => this.props.deleteReview(review.id)}
                  >
                    Delete Review
                  </button>
                }
            </ReviewBox>
          </ul>
        ))}
      </div>
    );
  }
}

const stateToPropertyMapper = (state) => ({
  profile: state.users.profile
});

export default connect(
  stateToPropertyMapper
)(ReviewList);
