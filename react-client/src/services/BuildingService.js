import { API_URL } from "../constants";

export const findAllBuildings = async () => {
  return fetch(`${API_URL}/buildings`)
    .then(response => response.json())
}

export const findBuildingById = async (buildingId) => {
  return fetch(`${API_URL}/buildings/${buildingId}`)
    .then(response => response.json())
}

export const findReviewsForBuilding = async (buildingId) => {
  return fetch(`${API_URL}/buildings/${buildingId}/reviews`)
    .then(response => response.json())
}

export const findPicturesForBuilding = async (buildingId) => {
  return fetch(`${API_URL}/buildings/${buildingId}/pictures`)
    .then(response => response.json())
}

export const createBuilding = async (building) => {
  return fetch(`${API_URL}/buildings`, {
    method: "POST",
    body: JSON.stringify(building),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json())
}

export const updateBuilding = async (buildingId, building) => {
  return fetch(`${API_URL}/buildings/${buildingId}`, {
    method: "PUT",
    body: JSON.stringify(building),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json())
}

// deleteBuilding
export const deleteBuilding = async (buildingId) => {
  return fetch(`${API_URL}/buildings/${buildingId}`, {
    method: "DELETE"
  }).then(response => response.json())
}

export default {
  findAllBuildings,
  findBuildingById,
  findReviewsForBuilding,
  findPicturesForBuilding,
  createBuilding,
  updateBuilding,
  deleteBuilding
}