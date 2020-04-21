import React from "react";
// import { connect } from "react-redux";
// import { createUser } from "../../actions/UserActions";
import { registerUser } from "../../services/UserService";
import { registerStaff } from "../../services/StaffService";
// import userService from "../../services/UserService";

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: "student",
      username: "start",
      role: "",
      password: "",
      confirmPassword: "",
      name: "",
      major: "",
      year: 1,
    };

    this.register = this.register.bind(this);
  }


  register() {
    if (this.state.password !== this.state.confirmPassword) {
      alert("Passwords do not match.");
    } else {
      if (this.state.userType === "student") {
        registerUser({
          username: this.state.username,
          password: this.state.password,
          name: this.state.name,
          major: this.state.major,
          year: this.state.year,
        }).then((newUser) => this.props.history.push("/home"));
      } else if (this.state.userType === "staff") {
        console.log("register staff")
        registerStaff({
          username: this.state.username,
          password: this.state.password,
          name: this.state.name,
          role: this.state.role
        }).then((newUser) => this.props.history.push("/home"));
      }
    }
  }

  render() {
    return (
      <div>
        <form>
          <div className="form-group row">
            <label htmlFor="userTypeFld" className="col-sm-2 col-form-label">
              User Type
            </label>
            <div className="col-sm-10">
              <select class="form-control"
                id="userTypeFld"
                onChange={() => {
                  this.setState({ userType: document.getElementById("userTypeFld").value })
                }}>
                <option value="student">Student</option>
                <option value="staff">Staff</option>
              </select>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="usernameFld" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                className="form-control"
                id="usernameFld"
                placeholder="presidentaoun@northeastern.edu"
                type="email"
                onChange={(e) => this.setState({ username: e.target.value })}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="nameFld" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="nameFld"
                placeholder="Joseph Aoun"
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </div>
          </div>
          {(this.state.userType === "student") &&
            <div>
              <div className="form-group row">
                <label htmlFor="majorFld" className="col-sm-2 col-form-label">
                  Major
            </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="majorFld"
                    placeholder="Computer Science"
                    onChange={(e) => this.setState({ major: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="yearFld" className="col-sm-2 col-form-label">
                  Year
                </label>
                <div className="col-sm-10">
                  <input
                    type="number"
                    className="form-control"
                    id="yearFld"
                    placeholder="4"
                    onChange={(e) => this.setState({ year: e.target.value })}
                  />
                </div>
              </div>
            </div>
          }

          {(this.state.userType === "staff") &&
            <div className="form-group row">
              <label htmlFor="roleFld" className="col-sm-2 col-form-label">
                Role
            </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="roleFld"
                  placeholder="Professor"
                  onChange={(e) => this.setState({ role: e.target.value })}
                />
              </div>
            </div>
          }

          <div className="form-group row">
            <label htmlFor="passwordFld" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="passwordFld"
                placeholder="*********"
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="confpasswordFld"
              className="col-sm-2 col-form-label"
            >
              Confirm Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="confpasswordFld"
                placeholder="*********"
                onChange={(e) =>
                  this.setState({ confirmPassword: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-group row mt-4">
            <label className="col-sm-2 col-form-label"></label>
            <button
              className="btn btn-primary col ml-3 mr-4"
              onClick={this.register}
              type="button"
            >
              Sign Up
            </button>
            <button
              href="../home"
              className="btn btn-outline-secondary col mr-3"
              onClick={() => this.props.history.push("/home")}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div >
    );
  }
}

// const dispatchToPropertyMapper = (dispatch) => ({
//   createUser: (user) => {
//     userService
//       .createUser(user)
//       .then((actualUser) => dispatch(createUser(actualUser)));
//   },
// });

// const stateToPropertyMapper = (state) => ({
//   // users: state.buildings.buildings
// });

// export default connect(
//   stateToPropertyMapper,
//   dispatchToPropertyMapper
// )(RegistrationForm);

export default RegistrationForm;
