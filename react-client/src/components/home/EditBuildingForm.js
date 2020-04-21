import React from "react";
import { connect } from "react-redux";
import { createReview } from "../../actions/ReviewActions";
import reviewService from "../../services/ReviewService";
import userService from "../../services/UserService";
import { profile } from "../../actions/UserActions";

class EditBuildingForm extends React.Component {
  state = {
    name: this.props.building.name,
    address: this.props.building.address,
    thumbnail: this.props.building.thumbnailImageUrl,
    mainImage: this.props.building.mainImageUrl,
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
    };
    console.log(review);
    this.props.createReview(this.props.building.id, review);
    this.props.submitReview();
    alert("Your review was posted!");
  };

  render() {
    if (this.props.building) {
      return (
        <div
          class="modal fade"
          id={`editBuildingModal${this.props.building.id}`}
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog mt-5" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Edit Building
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
                    <label for="edit-name" class="col-form-label">
                      Name:
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="edit-name"
                      onChange={(e) => this.setState({ name: e.target.value })}
                      defaultValue={this.state.name}
                    />
                  </div>
                  <div class="form-group">
                    <label for="edit-Address" class="col-form-label">
                      Address:
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="edit-Address"
                      onChange={(e) =>
                        this.setState({ address: e.target.value })
                      }
                      defaultValue={this.state.address}
                    />
                  </div>
                  <div class="form-group">
                    <label for="edit-Thumbnail" class="col-form-label">
                      Thumbnail Image URL:
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="edit-Thumbnail"
                      onChange={(e) =>
                        this.setState({ thumbnail: e.target.value })
                      }
                      defaultValue={this.state.thumbnail}
                    />
                  </div>
                  <div class="form-group">
                    <label for="edit-mainimage" class="col-form-label">
                      Main Image URL:
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="edit-mainimage"
                      onChange={(e) =>
                        this.setState({ mainImage: e.target.value })
                      }
                      defaultValue={this.state.mainImage}
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
                  Cancel
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  // onClick={this.postReview}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const dispatchToPropertyMapper = (dispatch) => ({
  getProfile: () => {
    userService.profile().then((actualProfile) => {
      if (actualProfile.username) {
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
});

export default connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(EditBuildingForm);
