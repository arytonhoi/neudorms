package com.example.course_editor.services;

import com.example.course_editor.models.*;
import com.example.course_editor.repositories.BuildingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BuildingService {
  @Autowired
  BuildingRepository buildingRepository;
  @Autowired
  UserService userService;

  public Building findBuildingById(Integer buildingId) {
    return buildingRepository.findBuildingById(buildingId);
  }

  public List<Building> findAllBuildings() {
    return (List<Building>) buildingRepository.findAll();
  }

  public Building createBuilding(Building building) {
    return buildingRepository.save(building);
  }

  public int updateBuilding(Integer buildingId, Building building) {
    // make sure building exists
    int buildingIdIndex = -1;
    List<Building> buildingList = this.findAllBuildings();
    for (int i = 0; i < buildingList.size(); i++) {
      Building b = buildingList.get(i);
      if (b.getId() == buildingId) {
        buildingIdIndex = i;
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

  public Integer addReviewForBuilding(Integer buildingId, Review review)   {
    Building building = this.findBuildingById(buildingId);
    building.addReview(review);
    buildingRepository.save(building);
    return 1;
  }

  public Integer addBookmarkUser(Integer userId, Integer buildingId) {
    User user = userService.findUserById(userId);
    Building building = this.findBuildingById(buildingId);
    building.addBookmarkUser(user);
    buildingRepository.save(building);
    return 1;
  }
}