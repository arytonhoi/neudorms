import React from "react";
import { connect } from "react-redux";
import { createPicture } from "../../actions/PictureActions";
import pictureService from "../../services/PictureService";
import userService from "../../services/UserService";
import { profile, logout } from "../../actions/UserActions";
import "./details.css";
import staffService from "../../services/StaffService";

class ImageForm extends React.Component {
  state = {
    url: ""
  };

  componentDidMount() {
    this.props.getProfile();
  }

  render() {
    return (
      <div
        class="modal fade"
        id="photoModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog mt-5" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Add a Photo
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
                  <label for="image-url" class="col-form-label">
                    Image URL:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="image-url"
                    onChange={(e) =>
                      this.setState({ url: e.target.value })
                    }
                    placeholder="Dorm image URL."
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
                data-dismiss="modal"
                onClick={() => {
                  if (this.state.url !== "") {
                    this.props.createPicture(this.props.building.id, this.state)
                  } else {
                    alert("Url cannot be empty")
                  }
                }}
              >
                Post Image
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
      if (actualProfile && actualProfile.username) {
        dispatch(profile(actualProfile, "user"));
      } else {
        staffService.profile().then((staffProfile) => {
          if (staffProfile && staffProfile.username) {
            dispatch(profile(staffProfile, "staff"));
          } else {
            dispatch(logout());
          }
        });
      }
    });
  },
  createPicture: (buildingId, picture) => {
    pictureService
      .createPicture(buildingId, picture)
      .then((picture) => dispatch(createPicture(picture)));
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
)(ImageForm);
