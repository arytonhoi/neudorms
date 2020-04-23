import {
  FIND_ALL_USERS,
  FIND_USER_BY_USERNAME,
  FIND_BOOKMARKS_FOR_USER,
  ADD_USER_BOOKMARK,
  REMOVE_USER_BOOKMARK,
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
  role: ""
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_ALL_USERS:
      return {
        ...state,
        users: action.users,
      };

    case FIND_USER_BY_USERNAME:
      console.log("in userreducer")
      console.log(action.user)
      return {
        ...state,
        user: action.user,
      };

    case FIND_BOOKMARKS_FOR_USER:
      return {
        ...state,
        bookmarks: action.bookmarks,
      };


    case ADD_USER_BOOKMARK:
      return {
        ...state,
        bookmarks:
          [
            ...state.bookmarks,
            action.building
          ]
      };

    case REMOVE_USER_BOOKMARK:
      return {
        ...state,
        bookmarks: state.bookmarks.filter(building => building.id !== action.buildingId)
      }

    case CREATE_USER:
      return {
        ...state,
        user: action.user,
      };

    case UPDATE_USER:
      let updatedUsers = state.users.filter(
        (user) => user.username !== action.username
      );
      return {
        ...state,
        users: [...updatedUsers, action.user],
      };

    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.username !== action.username),
      };

    case PROFILE:
      return {
        ...state,
        profile: action.profile,
        loggedIn: true,
        role: action.role
      };

    case LOGIN:
      return {
        ...state,
        loggedIn: true,
      };

    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        role: ""
      };

    default:
      return state;
  }
};

export default userReducer;
