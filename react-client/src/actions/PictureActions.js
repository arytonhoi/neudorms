import { FIND_ALL_PICTURES, FIND_PICTURES_FOR_BUILDING, CREATE_PICTURE, UPDATE_PICTURE,
    DELETE_PICTURE } from '../constants';

export const findAllPictures = (pictures) => ({
    type: FIND_ALL_PICTURES,
    pictures: pictures
})

export const findPicturesForBuilding = (buildingId) => ({
    type: FIND_PICTURES_FOR_BUILDING,
    buildingId: buildingId
})

export const createPicture = (picture) => ({
    type: CREATE_PICTURE,
    pictures: picture
})

export const updatePicture = (pictureId, picture) => ({
    type: UPDATE_PICTURE,
    pictureId: pictureId,
    picture: picture
})

export const deletePicture = (pictureId) => ({
    type: DELETE_PICTURE,
    pictureId: pictureId
})