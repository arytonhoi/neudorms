import React from "react";
import "./details.css";
import styled from "styled-components";
import ViewProfileContainer from "../../containers/ViewProfileContainer";
import { Link } from "react-router-dom";

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

const ReviewBoxRed = styled.div`
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  background-color: red;
  padding: 12px 24px;
  margin-bottom: 12px;
`;

const ReviewBoxGreen = styled.div`
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  background-color: lightgreen;
  padding: 12px 24px;
  margin-bottom: 12px;
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

const ReviewHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

class ReviewList extends React.Component {
  render() {
    if (this.props.inHome) {
      return (
        <div >
          <div className="row mt-4">
            {this.props.reviews.map((review) => (
              <div className="mb-2 col-3 d-flex align-items-stretch">
                <ReviewBox className="card" key={review.id}>
                  <ReviewHeader>
                    <div>
                      <ReviewBuilding>
                        <Link className="link" to={`/details/${review.referencedBuildingId}`}>{review.buildingName}</Link>
                      </ReviewBuilding>
                      <Sentiment>Sentiment: {review.sentiment}</Sentiment>
                    </div>
                    <ReviewUser>
                      <div>
                        {new Date(review.date).toLocaleDateString("en-US", {
                          timeZone: "UTC",
                        })}
                      </div>
                      <Link className="link" to={`/profile/${review.username}`}>{review.name}</Link>
                    </ReviewUser>
                  </ReviewHeader>
                  <ReviewText>{review.text}</ReviewText>
                </ReviewBox>
                </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="mb-5">
        {!this.props.inProfile && <Title>Reviews</Title>}
        <span>
          <button className='btn btn-warning' onClick={() => this.props.filter(this.props.buildingId, '')}>
            All reviews
          </button>
          <button className='btn btn-success' onClick={() => this.props.filter(this.props.buildingId, 'positive')}>
            Positive reviews
          </button>
          <button className='btn btn-danger' onClick={() => this.props.filter(this.props.buildingId, 'negative')}>
            Negative reviews
          </button>
        </span>
        {this.props.reviews.map((review) => (
          <ul className="list-group" key={review.id}>
            <ReviewBox className="card">
              <ReviewHeader>
                <div>
                  <ReviewBuilding>
                    Review on {review.buildingName}
                  </ReviewBuilding>
                  <Sentiment>Sentiment: {review.sentiment}</Sentiment>
                </div>
                <ReviewUser>
                  <div>
                    {new Date(review.date).toLocaleDateString("en-US", {
                      timeZone: "UTC",
                    })}
                  </div>
                  <a href={`/profile/${review.username}`}>{review.name}</a>
                </ReviewUser>
              </ReviewHeader>
              <ReviewText>{review.text}</ReviewText>
            </ReviewBox>
            {/* {review.sentiment > 0.1 &&
              <ReviewBoxGreen className="card">
                <ReviewHeader>
                  <ReviewUser>
                    <a href={`/profile/${review.username}`}>{review.name}</a>
                    <ReviewDate> on {new Date(review.date).toDateString()}</ReviewDate>
                  </ReviewUser>
                  <Sentiment>Postive review</Sentiment>
                </ReviewHeader>
                <ReviewBuilding>{review.buildingName}</ReviewBuilding>
                <ReviewText>{review.text}</ReviewText>
                {this.props.profile.username === review.username &&
                  <button className='btn btn-danger'
                    onClick={() => this.props.deleteReview(review.id)}
                  >
                    Delete Review
                  </button>
                }
              </ReviewBoxGreen>
            }
            {review.sentiment < -0.1 &&
              <ReviewBoxRed className="card">
                <ReviewHeader>
                  <ReviewUser>
                    <a href={`/profile/${review.username}`}>{review.name}</a>
                    <ReviewDate> on {new Date(review.date).toDateString()}</ReviewDate>
                  </ReviewUser>
                  <Sentiment>Negative review</Sentiment>
                </ReviewHeader>
                <ReviewBuilding>{review.buildingName}</ReviewBuilding>
                <ReviewText>{review.text}</ReviewText>
                {this.props.profile.username === review.username &&
                  <button className='btn btn-danger'
                    onClick={() => this.props.deleteReview(review.id)}
                  >
                    Delete Review
                  </button>
                }
              </ReviewBoxRed>
            }
            {(review.sentiment >= -0.1 && review.sentiment <= 0.1) &&
              <ReviewBox className="card">
                <ReviewHeader>
                  <ReviewUser>
                    <a href={`/profile/${review.username}`}>{review.name}</a>
                    <ReviewDate> on {new Date(review.date).toDateString()}</ReviewDate>
                  </ReviewUser>
                  <Sentiment>Neutral review</Sentiment>
                </ReviewHeader>
                <ReviewBuilding>{review.buildingName}</ReviewBuilding>
                <ReviewText>{review.text}</ReviewText>
                {this.props.profile.username === review.username &&
                  <button className='btn btn-danger'
                    onClick={() => this.props.deleteReview(review.id)}
                  >
                    Delete Review
                  </button>
                }
              </ReviewBox>
            } */}
          </ul>
        ))}
      </div>
    );
  }
}

export default ReviewList;
