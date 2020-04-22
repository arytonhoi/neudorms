import React from "react";
import { connect } from "react-redux";
import {
  findUserByUsername
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

class ViewProfileComponent extends React.Component {
  componentDidMount() {
    this.props.getUser(this.props.username);
  }

  render() {
    return (
      <Wrapper className="col-4">
        <Header>{this.props.user.name}'s Profile</Header>
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
                readOnly
                defaultValue={this.props.user.username}
              />
            </div>
            <label for="profile-name" class="col-form-label">
              Name
            </label>
            <input
              class="form-control"
              id="profile-name"
              defaultValue={this.props.user.name}
              readOnly
            ></input>
          </div>
          <div class="form-group mb-2">
            <label for="profile-major" class="col-form-label">
              Major
            </label>
            <input
              type="text"
              class="form-control"
              id="profile-major"
              readOnly
              defaultValue={this.props.user.major}
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
              readOnly
              defaultValue={this.props.user.year}
            />
          </div>
        </form>
      </Wrapper>
    );
  }
}

const dispatchToPropertyMapper = (dispatch) => ({
  getUser: (username) => {
    userService.findUserByUsername(username).then((user) => {
      if (user.username) {
        dispatch(findUserByUsername(user));
      }
    });
  },
});

const stateToPropertyMapper = (state) => {
  return {
    user: state.users.user,
  };
};

export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(ViewProfileComponent);
