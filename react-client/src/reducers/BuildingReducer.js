import {
  FIND_ALL_BUILDINGS,
  FIND_BUILDING_BY_ID,
  CREATE_BUILDING,
  DELETE_BUILDING,
  UPDATE_BUILDING,
  FILTER_BUILDINGS,
  EDIT_BUILDING
} from '../constants';

const initialState = {
  buildings: [],
  building: {
    reviews: []
  },
  editBuilding: {

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
      console.log(action.buildings)
      // filters by search term
      if (action.searchTerm !== '') {
        filteredBuildings = filteredBuildings
          .filter(building => building.name.toLowerCase().includes(action.searchTerm.toLowerCase()));
      }
      // filter by filters
      let residentTypes = action.filters.residentTypes;
      residentTypes.forEach((residentType) => {
        console.log(residentType)
        filteredBuildings = filteredBuildings
          .filter(building => {
            if (building.residentTypes !== null) {
              return building.residentTypes.includes(residentType)
            } else {
              return false;
            }
          })

      });

      // let maxCost = action.filter.maxCost;
      // let buildingTypes = action.filter.buildingTypes;
      // let roomTypes = action.filter.roomTypes;
      // let amenities = action.filter.amenities;

      console.log(filteredBuildings)

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

    case EDIT_BUILDING:
      return {
        editBuilding: action.building
      }

    default:
      return state
  }
}

export default buildingReducer;