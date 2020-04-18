import React from "react";
import LoginForm from "../components/registration/LoginForm";

class LoginContainer extends React.Component {
  render() {
    return (
      <div className="container mt-5 pl-5 pr-5">
        <h1 className="mb-4">Log In</h1>
        <LoginForm history={this.props.history} />
      </div>
    );
  }
}

export default LoginContainer;