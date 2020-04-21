import { API_URL, REGISTER_URL } from "../constants";

// Registration Services
export const logout = () =>
  fetch(`${API_URL}/staff/logout`, {
    method: "POST",
    credentials: "include"
  });

export const profile = () =>
  fetch(`${API_URL}/staff/profile`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include"
  }).then((response) => response.json());

export const registerStaff = (user) =>
  fetch(`${API_URL}/staff/register`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "content-type": "application/json",
    },
    credentials: "include"
  }).then((response) => response.json());

export const loginStaff = (user) =>
  fetch(`${API_URL}/staff/login`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "content-type": "application/json",
    },
    credentials: "include"
  }).then((response) => response.json());


// staff API Services
export const findAllstaff = async () => {
  return fetch(`${API_URL}/staff`).then((response) => response.json());
};

export const findStaffByUsername = async (username) => {
  return fetch(`${API_URL}/staff/${username}`).then((response) =>
    response.json()
  );
};

export const updateStaff = async (username, user) => {
  return fetch(`${API_URL}/staff/${username}`, {
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => response.json());
};

export const deleteStaff = async (username) => {
  return fetch(`${API_URL}/staff/${username}`, {
    method: "DELETE",
  }).then((response) => response.json());
};

export default {
  logout, 
  profile,
  loginStaff,
  registerStaff,
  findAllstaff,
  findStaffByUsername,
  updateStaff,
  deleteStaff
};
