import { API_URL } from "../constants";

export const findAllPictures = async () => {
    return fetch(`${API_URL}/pictures`)
        .then(response => response.json())
}

export const createPicture = async (buildingId, picture) => {
    return fetch(`${API_URL}/buildings/${buildingId}/pictures`, {
        method: "POST",
        body: JSON.stringify(picture),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
}

export const updatePicture = async (pictureId, picture) => {
    return fetch(`${API_URL}/pictures/${pictureId}`, {
        method: "PUT",
        body: JSON.stringify(picture),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
}

export const deletePicture = async pictureId => {
    return fetch(`${API_URL}/pictures/${pictureId}`, {
        method: "DELETE"
    }).then(response => response.json())
}

export default {
    findAllPictures,
    createPicture,
    updatePicture,
    deletePicture
}