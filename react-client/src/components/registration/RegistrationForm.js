import React from "react";
import { connect } from "react-redux";
import { createUser } from "../../actions/UserActions";
import userService from "../../services/UserService";

class RegistrationForm extends React.Component {
  componentDidMount() {
  }

  state = {
    user: {

    }
  }

  // <input
  // className="form-control"
  // placeholder="Header text"
  // onChange={(e) => {
  //   const newTitle = e.target.value;
  //   this.setState(prevState => ({
  //     widget: {
  //       ...prevState.widget,
  //       text: newTitle
  //     }
  //   }))
  // }}
  // value={this.state.widget.text} />

  render() {
    return (
      <div>
        <form>
          <div className="form-group row">
            <label htmlFor="usernameFld" className="col-sm-2 col-form-label">
              Username </label>
            <div className="col-sm-10">
              <input className="form-control"
                id="usernameFld"
                placeholder="Alice" readOnly></input>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="passwordFld" className="col-sm-2 col-form-label">
              Password </label>
            <div className="col-sm-10">
              <input type="password" className="form-control"
                id="passwordFld"
                placeholder="*********"></input>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="phoneFld" className="col-sm-2 col-form-label">
              Phone </label>
            <div className="col-sm-10">
              <input className="form-control"
                id="phoneFld"
                placeholder="(555) 123-4324"></input>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="emailFld" className="col-sm-2 col-form-label">
              Email </label>
            <div className="col-sm-10">
              <input className="form-control"
                id="emailFld"
                placeholder="alice@wonderland.com"></input>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="dobFld" className="col-sm-2 col-form-label">
              Date of Birth </label>
            <div className="col-sm-10">
              <input type="date" className="form-control"
                id="dobFld"
                placeholder=""></input>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="roleFld" className="col-sm-2 col-form-label">
              Role </label>
            <div className="col-sm-10">
              <select id="roleFld" className="form-control">
                <option value="Student">Student</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label"></label>
            <div className="col-sm-10">
              <button id="updateBtn" className="btn btn-success btn-block">Update</button>
              <a href="../home" id="logoutBtn"
                className="btn btn-danger btn-block">Logout</a>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const dispatchToPropertyMapper = (dispatch) => ({
  createUser: (user) => {
    userService.createUser(user)
      .then((user) => dispatch(createUser(user)));
  }
});

const stateToPropertyMapper = (state) => ({
  // users: state.buildings.buildings
});

export default connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(RegistrationForm);

