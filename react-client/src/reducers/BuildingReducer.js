import {
  FIND_ALL_BUILDINGS,
  FIND_BUILDING_BY_ID,
  CREATE_BUILDING,
  DELETE_BUILDING,
  UPDATE_BUILDING,
} from '../constants';

const initialState = {
  buildings: [],
  building: {
    reviews: []
  }
}

const buildingReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_ALL_BUILDINGS:
      return {
        buildings: action.buildings
      }

    case FIND_BUILDING_BY_ID:
      return {
        building: action.building
      }

    case CREATE_BUILDING:
      return {
        buildings: [
          ...state.buildings,
          action.building
        ]
      }

    case UPDATE_BUILDING:
      let updatedBuilding = state.buildings.filter(building => building.id !== action.buildingId)
      return {
        buildings: [
          ...updatedBuilding,
          action.building
        ]
      }

    case DELETE_BUILDING:
      return {
        buildings: state.buildings.filter(building => building.id !== action.buildingId)
      }

    default:
      return state
  }
}

export default buildingReducer;