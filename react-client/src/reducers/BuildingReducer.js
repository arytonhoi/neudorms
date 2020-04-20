import {
  FIND_ALL_BUILDINGS,
  FIND_BUILDING_BY_ID,
  CREATE_BUILDING,
  DELETE_BUILDING,
  UPDATE_BUILDING,
  FILTER_BUILDINGS
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

    case FILTER_BUILDINGS:
      let filteredBuildings = action.buildings;
      console.log(action.searchTerm)
      console.log(action.buildings)
      if (action.searchTerm !== '') {
        filteredBuildings = filteredBuildings
          .filter(building => building.name.toLowerCase() === action.searchTerm.toLowerCase());
      }
      return {
        buildings: filteredBuildings
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