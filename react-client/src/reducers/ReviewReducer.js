import { FIND_ALL_REVIEWS, FIND_REVIEW_BY_ID, FIND_REVIEWS_BY_USER, CREATE_REVIEW,
    UPDATE_REVIEW, DELETE_REVIEW, FIND_REVIEWS_FOR_BUILDING} from '../constants'

const initialState = {
    reviews: [],
    review: {}
}

const reviewReducer = (state = initialState, action) => {
    switch(action.type) {
        case FIND_ALL_REVIEWS:
            return {
                ...state,
                reviews: action.reviews
            }

        case FIND_REVIEW_BY_ID:
            return {
                ...state,
                review: action.review
            }

        case FIND_REVIEWS_BY_USER:
            return {
                ...state,
                reviews: state.reviews.find(review => review.username === action.username)
            }

        case FIND_REVIEWS_FOR_BUILDING:
            return {
                ...state,
                reviews: state.reviews.filter(review => review.building.id !== action.buildingId)
            }

        case CREATE_REVIEW:
            return {
                ...state,
                reviews: [
                    ...state.reviews,
                    action.review
                ]
            }

        case UPDATE_REVIEW:
            let otherReviews = state.reviews.filter(review => review.id !== action.reviewId)
             return {
                ...state,
                 reviews: [
                     ...otherReviews,
                     action.review
                 ]
             }

        case DELETE_REVIEW:
            return {
                ...state,
                reviews: state.reviews.filter(review => review.id !== action.reviewId)
            }

        default:
            return state
    }
}

export default reviewReducer