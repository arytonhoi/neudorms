import {
  FIND_ALL_REVIEWS,
  FIND_REVIEW_BY_ID,
  FIND_REVIEWS_BY_USER,
  CREATE_REVIEW,
  UPDATE_REVIEW,
  DELETE_REVIEW,
  FIND_REVIEWS_FOR_BUILDING,
  FIND_RECENT_REVIEWS,
  FIND_RECENT_USER_REVIEWS,
  FILTER_REVIEWS,
} from "../constants";

export const findAllReviews = (reviews) => ({
  type: FIND_ALL_REVIEWS,
  reviews: reviews,
});

export const findReviewById = (reviewId) => ({
  type: FIND_REVIEW_BY_ID,
  reviewId: reviewId,
});

export const findReviewsByUser = (username) => ({
  type: FIND_REVIEWS_BY_USER,
  username: username,
});

export const findReviewsForBuilding = (buildingId) => ({
  type: FIND_REVIEWS_FOR_BUILDING,
  buildingId: buildingId,
});

export const createReview = (review) => ({
  type: CREATE_REVIEW,
  review: review,
});

export const updateReview = (reviewId, review) => ({
  type: UPDATE_REVIEW,
  reviewId: reviewId,
  review: review,
});

export const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId: reviewId,
});

export const findRecentReviews = (reviews) => ({
  type: FIND_RECENT_REVIEWS,
  reviews: reviews,
});

export const findRecentUserReviews = (reviews) => ({
  type: FIND_RECENT_USER_REVIEWS,
  reviews: reviews,
});
export const filterReviews = (reviews, preference) => ({
  type: FILTER_REVIEWS,
  reviews: reviews,
  preference: preference,
});
