import {
  FIND_ALL_USERS,
  FIND_USER_BY_USERNAME,
  FIND_BOOKMARKS_FOR_USER,
  ADD_USER_BOOKMARK,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  PROFILE,
  LOGIN,
  LOGOUT
} from "../constants";

const initialState = {
  users: [],
  user: {},
  bookmarks: [],
  profile: {
    username: "",
  },
  loggedIn: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_ALL_USERS:
      return {
        users: action.users,
      };

    case FIND_USER_BY_USERNAME:
      return {
        user: action.user,
      };

    case FIND_BOOKMARKS_FOR_USER:
      return {
        bookmarks: action.bookmarks,
      };


    case ADD_USER_BOOKMARK:
      return {
        bookmarks: action.bookmarks,
      };

    case CREATE_USER:
      return {
        user: action.user,
      };

    case UPDATE_USER:
      let updatedUsers = state.users.filter(
        (user) => user.username !== action.username
      );
      return {
        users: [...updatedUsers, action.user],
      };

    case DELETE_USER:
      return {
        users: state.users.filter((user) => user.username !== action.username),
      };

    case PROFILE:
      console.log("IN REDUCER: " + action.profile.username)
      return {
        profile: action.profile,
        loggedIn: true
      };

    case LOGIN:
      return {
        loggedIn: true,
      };

    case LOGOUT:
      return {
        loggedIn: false,
      };

    default:
      return state;
  }
};

export default userReducer;
