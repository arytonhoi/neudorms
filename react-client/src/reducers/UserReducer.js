import {
  FIND_ALL_USERS,
  FIND_USER_BY_USERNAME,
  FIND_BOOKMARKS_FOR_USER,
  ADD_USER_BOOKMARK,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER
} from '../constants';

const initialState = {
  users: [],
  user: {},
  bookmarks: []
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_ALL_USERS:
      return {
        users: action.users
      }

    case FIND_USER_BY_USERNAME:
      return {
        user: action.user
      }

    case CREATE_USER:
      return {
        user: action.user
      }

    case UPDATE_USER:
      let updatedUsers = state.users.filter(user => user.id !== action.userId)
      return {
        users: [
          ...updatedUsers,
          action.user
        ]
      }

    case DELETE_USER:
      return {
        users: state.users.filter(user => user.id !== action.userId)
      }

    default:
      return state
  }
}

export default userReducer;