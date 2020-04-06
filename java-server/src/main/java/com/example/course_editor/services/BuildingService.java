package com.example.course_editor.services;

import com.example.course_editor.models.Building;
import com.example.course_editor.repositories.BuildingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BuildingService {
  @Autowired
  BuildingRepository buildingRepository;

  public Building createBuilding(Building building) {
    return buildingRepository.save(building);
  }

  // public List<Topic> findTopicsForLesson(String lid) {
  //   return topicRepository.findTopicsForLesson(lid);
  // }

  public int updateBuilding(Integer buildingId, Building building) {
    // make sure building exists
    int buildingIdIndex = -1;
    List<Building> buildingList = this.findAllBuildings();
    for (int i = 0; i < buildingList.size(); i++) {
      Building b = buildingList.get(i);
      if (b.getId() == buildingId) {
        buildingId = i;
        break;
      }
    }

    if (buildingIdIndex == -1) {
      return 0;
    } else {
      // Building b = this.findBuildingById(buildingIdIndex);
      this.deleteBuilding(buildingId);
      this.createBuilding(building);
      return 1;
    }
  }

  public Integer deleteBuilding(Integer buildingId) {
    buildingRepository.deleteById(buildingId);
    return 1;
  }

  public Building findBuildingById(Integer buildingId) {
    return buildingRepository.findBuildingById(buildingId);
  }

  public List<Building> findAllBuildings() {
    return (List<Building>) buildingRepository.findAll();
  }
}