import React from "react";
import { connect } from "react-redux";
import {
  findUserByUsername,
  updateUser,
  deleteUser,
} from "../../actions/UserActions";
import userService from "../../services/UserService";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-right: 60px;
`;

const Header = styled.div`
  font-size: 38px;
  font-weight: bold;
  letter-spacing: 1.1px;
  line-height: 50px;
`;

class ProfileComponent extends React.Component {
  state = {
    name: "",
    password: "",
    major: "",
    year: 1,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.profile.username === "" &&
      this.props.profile.username !== ""
    ) {
      this.setState({
        name: this.props.profile.name,
        password: this.props.profile.password,
        major: this.props.profile.major,
        year: this.props.profile.year,
      });
    }
  }

  render() {
    console.log(this.props.username)
    return (
      <Wrapper className="col-4">
        {this.props.username && (
          <Header>{this.props.profile.name}'s Profile</Header>
        )}
        {!this.props.username && <Header>My Profile</Header>}
        <hr />
        <form>
          <div class="form-group mb-2">
            <div class="form-group mb-2">
              <label for="profile-email" class="col-form-label">
                Email
              </label>
              <input
                type="text"
                class="form-control"
                id="profile-email"
                disabled
                defaultValue={this.props.profile.username}
              />
            </div>
            <label for="profile-name" class="col-form-label">
              Name
            </label>
            <input
              class="form-control"
              id="profile-name"
              defaultValue={this.props.profile.name}
              onChange={(e) =>
                this.setState(
                  { name: e.target.value },
                  console.log(this.state.name)
                )
              }
            ></input>
          </div>
          <div class="form-group mb-2">
            <label for="profile-password" class="col-form-label">
              Password
            </label>
            <input
              type="text"
              class="form-control"
              id="profile-password"
              onChange={(e) => this.setState({ password: e.target.value })}
              defaultValue={this.props.profile.password}
            />
          </div>
          <div class="form-group mb-2">
            <label for="profile-major" class="col-form-label">
              Major
            </label>
            <input
              type="text"
              class="form-control"
              id="profile-major"
              onChange={(e) => this.setState({ major: e.target.value })}
              defaultValue={this.props.profile.major}
            />
          </div>
          <div class="form-group mb-2">
            <label for="profile-year" class="col-form-label">
              Year
            </label>
            <input
              type="number"
              class="form-control"
              id="profile-year"
              onChange={(e) => this.setState({ year: e.target.value })}
              defaultValue={this.props.profile.year}
            />
          </div>
          <div className="row ml-0 mt-4">
            <button
              className="btn btn-success mr-3"
              type="button"
              onClick={() => {
                console.log("click");
                userService
                  .updateUser(this.props.profile.username, {
                    ...this.props.profile.username,
                    password: this.state.password,
                    major: this.state.major,
                    name: this.state.name,
                    year: this.state.year,
                  })
                  .then(alert("Your profile has been updated!"));
              }}
            >
              Update Profile
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() =>
                this.setState({
                  name: this.props.profile.name,
                  password: this.props.profile.password,
                  major: this.props.profile.major,
                  year: this.props.profile.year,
                })
              }
            >
              Cancel
            </button>
          </div>
        </form>
      </Wrapper>
    );
  }
}

const dispatchToPropertyMapper = (dispatch) => ({
  updateUser: (userId, user) => {
    userService.updateUser(userId, user);
  },
  deleteUser: (userId) => {
    userService
      .deleteUser(userId)
      .then((status) => dispatch(deleteUser(userId)));
  },
});

const stateToPropertyMapper = (state) => {
  return {
    user: state.users.user,
  };
};

export default connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(ProfileComponent);
