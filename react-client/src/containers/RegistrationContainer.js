import React from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import RegistrationForm from "../components/registration/RegistrationForm";
import userReducer from "../reducers/UserReducer";
import "./HomeContainer.css";

const rootReducer = combineReducers({
  users: userReducer,
});

let store = createStore(rootReducer);

class RegistrationContainer extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className='container'>
          <h1>Sign up</h1>
          <RegistrationForm />
        </div>
      </Provider>
    );
  }
}

export default RegistrationContainer;
