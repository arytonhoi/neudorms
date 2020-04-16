import React from "react";

class LoginContainer extends React.Component {
  render() {
    return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand mr-5" href="/home">
              neudorms
            </a>
          </nav>

          <div className="container">
            <h1>Sign In</h1>
            <form>
              <div className="form-group row">
                <label htmlFor="username" className="col-sm-2 col-form-label">
                  Username </label>
                <div className="col-sm-10">
                  <input className="form-control"
                         id="username"></input>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="password" className="col-sm-2 col-form-label">
                  Password </label>
                <div className="col-sm-10">
                  <input type="password" className="form-control"
                         id="password"></input>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label"></label>
                <div className="col-sm-10">
                  <a href="../home" id="login"
                     className="btn btn-primary btn-block">Sign in</a>
                  {/*<div className="row">*/}
                  {/*  <div className="col-6">*/}
                  {/*    <a href="#" id="forgot-password">Forgot Password?</a>*/}
                  {/*  </div>*/}
                  {/*  <div className="col-6">*/}
                  {/*    <a href="../register/register.template.client.html" id="register"*/}
                  {/*       className="float-right">Sign up</a>*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                </div>
              </div>
            </form>
          </div>
        </div>
    )
  }
}

export default LoginContainer