import { FIND_ALL_BUILDINGS, CREATE_BUILDING, DELETE_BUILDING, UPDATE_BUILDING } from '../constants';

export const findAllBuildings = (buildings) => ({
  type: FIND_ALL_BUILDINGS,
  buildings: buildings
})

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