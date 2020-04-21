import React from "react";
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
        {!this.props.inProfile && <Title>Reviews</Title>}
        {this.props.reviews.map((review) => (
          <ul className="list-group" key={review.id}>
            <ReviewBox className="card">
              <ReviewHeader>
                <ReviewUser>{review.username}</ReviewUser>
                <Sentiment>Sentiment: {review.sentiment}</Sentiment>
              </ReviewHeader>
              <ReviewText>{review.text}</ReviewText>
            </ReviewBox>
          </ul>
        ))}
      </div>
    );
  }
}

export default ReviewList;
