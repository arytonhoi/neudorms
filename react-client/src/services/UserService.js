import { API_URL } from "../constants";

export const findAllUsers = async () => {
    return fetch(`${API_URL}/users`)
        .then(response => response.json())
}

export const findUserByUsername = async (username) => {
    return fetch(`${API_URL}/users/${username}`)
        .then(response => response.json())
}

export const findBookmarksForUser = async (userId) => {
    return fetch(`${API_URL}/users/${userId}/bookmarks`)
        .then(response => response.json())
}

export const addUserBookmark = async (userId, buildingId) => {
    return fetch(`${API_URL}/users/${userId}/bookmarks/${buildingId}`, {
        method: "PUT",
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
}

export const createUser = async (user) => {
    return fetch(`${API_URL}/users`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
}

export const updateUser = async (username, user) => {
    return fetch(`${API_URL}/users/${username}`, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
}

export const deleteUser = async (username) => {
    return fetch(`${API_URL}/users/${username}`, {
        method: "DELETE"
    }).then(response => response.json())
}

export default {
    findAllUsers,
    findUserByUsername,
    findBookmarksForUser,
    addUserBookmark,
    createUser,
    updateUser,
    deleteUser
}