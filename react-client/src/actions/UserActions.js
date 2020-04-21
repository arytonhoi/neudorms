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
} from '../constants';

export const findAllUsers = (users) => ({
  type: FIND_ALL_USERS,
  users: users
})

export const findUserByUsername = (user) => {
  return {
    type: FIND_USER_BY_USERNAME,
    user: user
  }
}

export const findBookmarksForUser = (bookmarks) => {
  return {
    type: FIND_BOOKMARKS_FOR_USER,
    bookmarks: bookmarks
  }
}

export const addUserBookmark = (username, buildingId) => {
  return {
    type: ADD_USER_BOOKMARK,
    username: username,
    buildingId: buildingId
  }
}

export const createUser = (user) => ({
  type: CREATE_USER,
  user: user
})

export const deleteUser = (username) => ({
  type: DELETE_USER,
  username: username
})

export const updateUser = (username, user) => ({
  type: UPDATE_USER,
  username: username,
  user: user
})

export const profile = (profile) => ({
  type: PROFILE,
  profile: profile
})

export const login = () => ({
  type: LOGIN
})

export const logout = () => ({
  type: LOGOUT
})
