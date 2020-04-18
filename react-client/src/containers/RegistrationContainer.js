import React from "react";
import RegistrationForm from "../components/registration/RegistrationForm";
import "./HomeContainer.css";

class RegistrationContainer extends React.Component {
  render() {
    return (
      <div className="container mt-5 pl-5 pr-5">
        <h1 className="mb-4">Sign up</h1>
        <RegistrationForm history={this.props.history}/>
      </div>
    );
  }
}

export default RegistrationContainer;
