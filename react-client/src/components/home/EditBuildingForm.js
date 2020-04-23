import React from "react";
import { connect } from "react-redux";
import userService from "../../services/UserService";
import buildingService from "../../services/BuildingService";
import { updateBuilding, deleteBuilding } from "../../actions/BuildingActions";
import { deleteReviewsForBuilding } from "../../actions/ReviewActions";
import { profile, logout } from "../../actions/UserActions";
import staffService from "../../services/StaffService";

class EditBuildingForm extends React.Component {
  state = {
    id: this.props.building.id,
    name: this.props.building.name,
    address: this.props.building.address,
    thumbnailImageUrl: this.props.building.thumbnailImageUrl,
    mainImageUrl: this.props.building.mainImageUrl,
    amenities: this.props.building.amenities,
    residentTypes: this.props.building.residentTypes,
    buildingType: this.props.building.buildingType,
    roomTypes: this.props.building.roomTypes,
    minimumCost: this.props.building.minimumCost
  };

  componentDidMount() {
    this.props.getProfile();
  }

  render() {
    if (this.props.building) {
      return (
        <div
          class="modal fade"
          id={`editBuildingModal${this.props.building.id}`}
          tabIndex="-1"
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
                        this.setState({ thumbnailImageUrl: e.target.value })
                      }
                      defaultValue={this.state.thumbnailImageUrl}
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
                        this.setState({ mainImageUrl: e.target.value })
                      }
                      defaultValue={this.state.mainImageUrl}
                    />
                  </div>
                  <div class="form-group">
                    <label for="edit-amenties" class="col-form-label">
                      Amenities:
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="edit-amenties"
                      onChange={(e) => this.setState({ amenities: e.target.value })}
                      defaultValue={this.state.amenities}
                    />
                  </div>
                  <div class="form-group">
                    <label for="edit-residentTypes" class="col-form-label">
                      Resident Types:
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="edit-residentTypes"
                      onChange={(e) => this.setState({ residentTypes: e.target.value })}
                      defaultValue={this.state.residentTypes}
                    />
                  </div>
                  <div class="form-group">
                    <label for="edit-buildingTypes" class="col-form-label">
                      Building Types:
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="edit-buildingTypes"
                      onChange={(e) => this.setState({ buildingType: e.target.value })}
                      defaultValue={this.state.buildingType}
                    />
                  </div>
                  <div class="form-group">
                    <label for="edit-roomTypes" class="col-form-label">
                      Room Types:
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="edit-roomTypes"
                      onChange={(e) => this.setState({ roomTypes: e.target.value })}
                      defaultValue={this.state.roomTypes}
                    />
                  </div>
                  <div class="form-group">
                    <label for="edit-minimumCost" class="col-form-label">
                      Minimum Cost:
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="edit-minimumCost"
                      onChange={(e) => {
                        let newCost = parseInt(e.target.value)
                        if (!isNaN(newCost)) {
                          this.setState({ minimumCost: newCost })
                        }
                      }}
                      defaultValue={this.state.minimumCost}
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
                  data-dismiss="modal"
                  onClick={() => {
                    this.props.updateBuilding(this.props.building.id, this.state)
                  }}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  data-dismiss="modal"
                  onClick={() => {
                    this.props.deleteBuilding(this.props.building.id)
                  }}
                >
                  Delete Building
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

  updateBuilding: (buildingId, building) => {
    buildingService
      .updateBuilding(buildingId, building)
      .then(status => dispatch(updateBuilding(buildingId, building)))
  },

  deleteBuilding: (buildingId) => {
    buildingService
      .deleteBuilding(buildingId)
      .then(status => {
        dispatch(deleteBuilding(buildingId));
        dispatch(deleteReviewsForBuilding(buildingId));
      })
  }
});

const stateToPropertyMapper = (state) => ({
  profile: state.users.profile,
  loggedIn: state.users.loggedIn,
});

export default connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(EditBuildingForm);
