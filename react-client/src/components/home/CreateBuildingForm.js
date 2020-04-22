import React from "react";
import { connect } from "react-redux";
import { createReview } from "../../actions/ReviewActions";
import reviewService from "../../services/ReviewService";
import userService from "../../services/UserService";
import buildingService from "../../services/BuildingService";
import { updateBuilding, createBuilding } from "../../actions/BuildingActions";
import { profile, logout } from "../../actions/UserActions";
import staffService from "../../services/StaffService";
import $ from "jquery";

class CreateBuildingForm extends React.Component {
  state = {
    name: "",
    address: "",
    thumbnailImageUrl: "",
    mainImageUrl: "",
    amenities: "",
    residentTypes: "",
    buildingType: "",
    roomTypes: "",
    minimumCost: ""
  };

  componentDidMount() {
    this.props.getProfile();
  }

  render() {
    return (
      <div
        class="modal fade"
        id={`createBuildingModal`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog mt-5" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Create Building
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
                    Building Name:
                    </label>
                  <input
                    type="text"
                    class="form-control"
                    id="edit-name"
                    onChange={(e) => this.setState({ name: e.target.value })}
                    placeholder="eg. West Village A"
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
                    placeholder="eg. 500 Parker St, Boston MA, 02115"
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
                    Amenities (capitalized and separate by commas):
                    </label>
                  <input
                    type="text"
                    class="form-control"
                    id="edit-amenties"
                    placeholder="eg. Laundry, Proctor, Vending machines, etc"
                    onChange={(e) => this.setState({ amenities: e.target.value })}
                    defaultValue={this.state.amenities}
                  />
                </div>
                <div class="form-group">
                  <label for="edit-residentTypes" class="col-form-label">
                    Resident Types (capitalized and separate by commas):
                    </label>
                  <input
                    type="text"
                    class="form-control"
                    id="edit-residentTypes"
                    placeholder="eg. Freshmen, Graduates, Law, etc"
                    onChange={(e) => this.setState({ residentTypes: e.target.value })}
                    defaultValue={this.state.residentTypes}
                  />
                </div>
                <div class="form-group">
                  <label for="edit-buildingTypes" class="col-form-label">
                    Building Types (capitalized and separate by commas):
                    </label>
                  <input
                    type="text"
                    class="form-control"
                    id="edit-buildingTypes"
                    placeholder="eg. Economy, Enhanced, etc"
                    onChange={(e) => this.setState({ buildingType: e.target.value })}
                    defaultValue={this.state.buildingType}
                  />
                </div>
                <div class="form-group">
                  <label for="edit-roomTypes" class="col-form-label">
                    Room Types (capitalized and separate by commas):
                    </label>
                  <input
                    type="text"
                    class="form-control"
                    id="edit-roomTypes"
                    placeholder="eg. Apartment, Traditional, etc"
                    onChange={(e) => this.setState({ roomTypes: e.target.value })}
                    defaultValue={this.state.roomTypes}
                  />
                </div>
                <div class="form-group">
                  <label for="edit-minimumCost" class="col-form-label">
                    Minimum Cost per semester:
                    </label>
                  <input
                    type="text"
                    class="form-control"
                    id="edit-minimumCost"
                    placeholder="eg. 3500"
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
                // data-dismiss="modal"
                onClick={() => {
                  this.props.createBuilding(this.state)
                }}
              >
                Create Building
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

  createBuilding: (building) => {
    if (
      building.name !== "" &&
      building.address !== "" &&
      building.thumbnailImageUrl !== "" &&
      building.mainImageUrl !== "" &&
      building.amenities !== "" &&
      building.residentTypes !== "" &&
      building.buildingType !== "" &&
      building.roomTypes !== "" &&
      building.minimumCost !== ""
    ) {
      $(`#createBuildingModal`).modal("hide");
      buildingService
        .createBuilding(building)
        .then((building) => dispatch(createBuilding(building)));
    } else {
      console.log(building)
      alert("All fields must be filled")
    }

  }
});

const stateToPropertyMapper = (state) => ({
  profile: state.users.profile,
  loggedIn: state.users.loggedIn,
});

export default connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(CreateBuildingForm);
