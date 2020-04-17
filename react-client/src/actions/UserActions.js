import {
  FIND_ALL_USERS,
  FIND_USER_BY_USERNAME,
  FIND_BOOKMARKS_FOR_USER,
  ADD_USER_BOOKMARK,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER
} from '../constants';

export const findAllUsers = (users) => ({
  type: FIND_ALL_USERS,
  users: users
})

export const findUserByUsername = (username) => {
  return {
    type: FIND_USER_BY_USERNAME,
    username: username
  }
}

export const findBookmarksForUser = (userId) => {
  return {
    type: FIND_BOOKMARKS_FOR_USER,
    userId: userId
  }
}

export const addUserBookmark = (userId, buildingId) => {
  return {
    type: ADD_USER_BOOKMARK,
    userId: userId,
    buildingId: buildingId
  }
}

export const createUser = (user) => ({
  type: CREATE_USER,
  user: user
})

export const deleteUser = (userId) => ({
  type: DELETE_USER,
  userId: userId
})

export const updateUser = (userId, user) => ({
  type: UPDATE_USER,
  userId: userId,
  user: user
})