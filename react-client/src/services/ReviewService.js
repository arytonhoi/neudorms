import { API_URL } from "../constants";

export const findAllReviews = async () => {
    return fetch(`${API_URL}/reviews`)
        .then(response => response.json())
}

export const findReviewById = async reviewId => {
    return fetch(`${API_URL}/reviews/${reviewId}`)
        .then(response => response.json())
}

export const findReviewsByUser = async username => {
    return fetch(`${API_URL}/users/${username}/reviews`)
        .then(response => response.json())
}

export const createReview = async (buildingId, review) => {
    return fetch(`${API_URL}/buildings/${buildingId}/reviews`, {
        method: "POST",
        body: JSON.stringify(review),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
}

export const updateReview = async (reviewId, review) => {
    return fetch(`${API_URL}/reviews/${reviewId}`, {
        method: "PUT",
        body: JSON.stringify(review),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
}

export const deleteReview = async (reviewId) => {
    return fetch(`${API_URL}/reviews/${reviewId}`, {
        method: "DELETE"
    }).then(response => response.json())
}

export default {
    findAllReviews,
    findReviewById,
    findReviewsByUser,
    createReview,
    updateReview,
    deleteReview
}