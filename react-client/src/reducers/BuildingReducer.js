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
      console.log(action.buildings)
      return {
        ...state,
        buildings: action.buildings
      }

    case FIND_BUILDING_BY_ID:
      return {
        ...state,
        building: action.building
      }

    case FILTER_BUILDINGS:
      let filteredBuildings = action.buildings;
      // filters by search term
      if (action.searchTerm !== '') {
        filteredBuildings = filteredBuildings
          .filter(building => building.name.toLowerCase().includes(action.searchTerm.toLowerCase()));
      }
      // filter by filters
      action.filters.residentTypes.forEach((residentType) => {
        filteredBuildings = filteredBuildings
          .filter(building => {
            if (building.residentTypes !== null) {
              return building.residentTypes.includes(residentType);
            } else {
              return false;
            }
          })
      })

      let maxCost = parseInt(action.filters.maxCost)
      if (maxCost > 0 && !isNaN(maxCost)) {
        filteredBuildings = filteredBuildings
          .filter(building => {
            if (building.minimumCost !== null) {
              return building.minimumCost <= maxCost
            } else {
              return false;
            }
          })
      }
      console.log(filteredBuildings)

      action.filters.roomTypes.forEach((roomType) => {
        filteredBuildings = filteredBuildings
          .filter(building => {
            if (building.roomTypes !== null) {
              return building.roomTypes.includes(roomType);
            } else {
              return false;
            }
          })
      })

      action.filters.buildingTypes.forEach((buildingType) => {
        filteredBuildings = filteredBuildings
          .filter(building => {
            if (building.buildingType !== null) {
              return building.buildingType.includes(buildingType);
            } else {
              return false;
            }
          })
      })

      action.filters.amenities.forEach((amenity) => {
        filteredBuildings = filteredBuildings
          .filter(building => {
            if (building.amenities !== null) {
              return building.amenities.includes(amenity);
            } else {
              return false;
            }
          })
      })

      console.log(filteredBuildings)
      return {
        ...state,
        buildings: filteredBuildings
      }

    case CREATE_BUILDING:
      return {
        ...state,
        buildings: [
          ...state.buildings,
          action.building
        ]
      }

    case UPDATE_BUILDING:
      let updatedBuildings = state.buildings.filter(building => building.id !== action.buildingId)
      return {
        ...state,
        buildings: [
          ...updatedBuildings,
          action.building
        ]
      }

    case DELETE_BUILDING:
      return {
        ...state,
        buildings: state.buildings.filter(building => building.id !== action.buildingId)
      }

    case EDIT_BUILDING:
      return {
        ...state,
        editBuilding: action.building
      }

    default:
      return state
  }
}

export default buildingReducer;