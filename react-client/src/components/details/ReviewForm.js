import React from "react";
import { connect } from "react-redux";
import { createReview } from "../../actions/ReviewActions";
import reviewService from "../../services/ReviewService";
import "./details.css";
import styled from "styled-components";

class ReviewForm extends React.Component {
  state = {
    username: this.props.profile.username,
    building: this.props.building.id,
    text: '',
    imageUrl: ''
  }

  postReview = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let review = {
      username: this.state.username,
      text: this.state.text,
      imageUrl: this.state.imageUrl,
      date: yyyy + '-' + mm + '-' + dd
    }
    this.props.createReview(this.props.building.id, review);
    this.props.submitReview()
    alert("Your review was posted!")
  }

  render() {
    return (
      <div>
        <form>
          <div className="form-group row">
            <div className="form-group row">
              <label htmlFor="imageFld" className="col-sm-2 col-form-label">
                Image:
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  id="imageFld"
                  placeholder="optional image URL to go with your review"
                  onChange={(e) => this.setState({ imageUrl: e.target.value })}
                />
              </div>
            </div>
            <label htmlFor="textFld" className="col-sm-2 col-form-label">
              Review:
            </label>
            <div className="col-sm-10">
              <input
                className="form-control"
                id="textFld"
                placeholder="Write your review here"
                onChange={(e) => this.setState({ text: e.target.value })}
              />
            </div>
          </div>
          <div className="form-group row mt-4">
            <label className="col-sm-2 col-form-label"></label>
            <button
              className="btn btn-primary col ml-3 mr-4"
              onClick={this.postReview}
              type="button">
              Post review
            </button>
            <button
              className="btn btn-outline-secondary col mr-3"
              // onClick={}
              type="button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const dispatchToPropertyMapper = (dispatch) => ({
  createReview: (buildingId, review) => {
    reviewService
      .createReview(buildingId, review)
      .then((review) => dispatch(createReview(review)));
  }
});

export default connect(null, dispatchToPropertyMapper)(ReviewForm);
