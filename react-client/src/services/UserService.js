import { API_URL, REGISTER_URL } from "../constants";

// Registration Services
export const logout = () =>
  fetch(`${API_URL}/users/logout`, {
    method: "POST",
    credentials: "include"
  });

export const profile = () =>
  fetch(`${API_URL}/users/profile`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include"
  }).then((response) => response.json());

export const register = (user) =>
  fetch(`${API_URL}/users/register`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "content-type": "application/json",
    },
    credentials: "include"
  }).then((response) => response.json());

export const login = (user) =>
  fetch(`${API_URL}/users/login`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "content-type": "application/json",
    },
    credentials: "include"
  }).then((response) => response.json());


// Users API Services
export const findAllUsers = async () => {
  return fetch(`${API_URL}/users`).then((response) => response.json());
};

export const findUserByUsername = async (username) => {
  return fetch(`${API_URL}/users/${username}`).then((response) =>
    response.json()
  );
};

export const findBookmarksForUser = async (username) => {
    console.log("SERVICE USERNAME: " + username);
    return fetch(`${API_URL}/users/${username}/bookmarks`).then((response) =>
        response.json()
  );
};

export const addUserBookmark = async (username, buildingId) => {
  return fetch(`${API_URL}/users/${username}/bookmarks/${buildingId}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => response.json());
};

export const createUser = (user) =>
  fetch(`${API_URL}/users`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => response.json());

export const updateUser = async (username, user) => {
  return fetch(`${API_URL}/users/${username}`, {
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => response.json());
};

export const deleteUser = async (username) => {
  return fetch(`${API_URL}/users/${username}`, {
    method: "DELETE",
  }).then((response) => response.json());
};

export default {
  logout,
  profile,
  login,
  register,
  findAllUsers,
  findUserByUsername,
  findBookmarksForUser,
  addUserBookmark,
  createUser,
  updateUser,
  deleteUser,
};
