import {
  FIND_ALL_BUILDINGS,
  FIND_BUILDING_BY_ID,
  CREATE_BUILDING,
  DELETE_BUILDING,
  UPDATE_BUILDING,
  FIND_PICTURES_FOR_BUILDING,
  FILTER_BUILDINGS,
  EDIT_BUILDING,
  HIGHEST_RATED,
  CLEAR_BUILDINGS
} from '../constants';

export const findAllBuildings = (buildings) => ({
  type: FIND_ALL_BUILDINGS,
  buildings: buildings
})

export const filterBuildings = (buildings, searchTerm, filters) => {
  return {
    type: FILTER_BUILDINGS,
    buildings: buildings,
    searchTerm: searchTerm,
    filters: filters
  }
}

export const sortBuildings = (buildings, preference) => {
  return {
    type: '',
    buildings: buildings
  }
}

export const findBuildingById = (building) => {
  return {
    type: FIND_BUILDING_BY_ID,
    building: building
  }
}

export const createBuilding = (building) => ({
  type: CREATE_BUILDING,
  building: building
})

export const deleteBuilding = (buildingId) => ({
  type: DELETE_BUILDING,
  buildingId: buildingId
})

export const updateBuilding = (buildingId, building) => ({
  type: UPDATE_BUILDING,
  buildingId: buildingId,
  building: building
})

export const editBuilding = (building) => ({
  type: EDIT_BUILDING,
  building: building
})

export const highestRated = (buildings) => ({
  type: HIGHEST_RATED,
  buildings: buildings
})

export const clearBuildings = () => ({
  type: CLEAR_BUILDINGS
})