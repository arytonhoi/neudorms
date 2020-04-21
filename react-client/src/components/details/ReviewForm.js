import React from "react";
import { connect } from "react-redux";
import { createReview } from "../../actions/ReviewActions";
import reviewService from "../../services/ReviewService";
import userService from "../../services/UserService";
import { profile } from "../../actions/UserActions";
import "./details.css";

class ReviewForm extends React.Component {
  state = {
    text: "",
    imageUrl: "",
  };

  componentDidMount() {
    this.props.getProfile();
  }

  postReview = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    let review = {
      username: this.props.profile.username,
      text: this.state.text,
      imageUrl: this.state.imageUrl,
      date: yyyy + "-" + mm + "-" + dd,
      name: this.props.profile.name,
      buildingName: this.props.building.name
    };
    console.log(review);
    this.props.createReview(this.props.building.id, review);
    this.props.submitReview();
    alert("Your review was posted!");
  };

  render() {
    return (
      <div
        class="modal fade"
        id="reviewModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog mt-5" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Write a Review
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="review-text" class="col-form-label">
                    Review Text:
                  </label>
                  <textarea
                    class="form-control"
                    id="review-text"
                    placeholder="Write your review here."
                    onChange={(e) => this.setState({ text: e.target.value })}
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="image-url" class="col-form-label">
                    Optional Image URL:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="image-url"
                    onChange={(e) =>
                      this.setState({ imageUrl: e.target.value })
                    }
                    placeholder="Optional image to go with your review."
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={this.postReview}
              >
                Post Review
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const dispatchToPropertyMapper = (dispatch) => ({
  getProfile: () => {
    userService.profile().then((actualProfile) => {
      if (actualProfile) {
        dispatch(profile(actualProfile));
      }
    });
  },
  createReview: (buildingId, review) => {
    reviewService
      .createReview(buildingId, review)
      .then((review) => dispatch(createReview(review)));
  },
});

const stateToPropertyMapper = (state) => ({
  profile: state.users.profile,
  loggedIn: state.users.loggedIn,
  building: state.buildings.building,
});

export default connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(ReviewForm);
