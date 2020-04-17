import { FIND_ALL_PICTURES, FIND_PICTURES_FOR_BUILDING, CREATE_PICTURE,
    UPDATE_PICTURE, DELETE_PICTURE } from '../constants';

const initialState = {
    pictures: []
}

const pictureReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_ALL_PICTURES:
            return {
                pictures: action.pictures
            }

        case FIND_PICTURES_FOR_BUILDING:
            return {
                pictures: action.pictures
            }

        case CREATE_PICTURE:
            return {
                pictures: [
                    ...state.pictures,
                    action.picture
                ]
            }

        case UPDATE_PICTURE:
            let otherPictures = state.pictures.filter(picture => picture.id !== action.pictureId)
            return {
                pictures: [
                    ...otherPictures,
                    action.picture
                ]
            }

        case DELETE_PICTURE:
            return {
                pictures: state.pictures.filter(picture => picture.id !== action.pictureId)
            }
    }
}

export default pictureReducer;