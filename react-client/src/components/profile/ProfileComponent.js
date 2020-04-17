import React from "react";
import { connect } from "react-redux";
import { findUserByUsername, updateUser, deleteUser } from "../../actions/UserActions";
import userService from '../../services/UserService';

class ProfileComponent extends React.Component {
    componentDidMount() {
        this.props.findUserByUsername(this.props.username);
    }

    render() {
        return (
            <div className="container-fluid">
                <h1>Profile</h1>
                {/*<div className="alert alert-success">*/}
                {/*  Profile successfully saved*/}
                {/*</div>*/}
                <form>
                    <div className="form-group row">
                        <label htmlFor="usernameFld" className="col-sm-2 col-form-label">
                            Username </label>
                        <div className="col-sm-10">
                            <input className="form-control"
                                   id="usernameFld"
                                   placeholder={this.props.username} readOnly></input>
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
                            <button id="deleteBtn" className="btn btn-secondary btn-block">Delete Account</button>


                            {/*onClick={() => this.props.createModule(this.props.courseId)}*/}
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const dispatchToPropertyMapper = (dispatch) => ({
    findUserByUsername: (username) => {
        userService.findUserByUsername(username)
            .then(user => dispatch(findUserByUsername(user)))
    },
    updateUser: (userId, user) => {
        userService.updateUser(userId, user)
            .then(status => dispatch(updateUser(userId, user)))
    },
    deleteUser: (userId) => {
        userService.deleteUser(userId)
            .then(status => dispatch(deleteUser(userId)))
    }
})

const stateToPropertyMapper = (state) => {
    return {
        user: state.users.user
    }
}

export default connect(stateToPropertyMapper, dispatchToPropertyMapper)
(ProfileComponent)