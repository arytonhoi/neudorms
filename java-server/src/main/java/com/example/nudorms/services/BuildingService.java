package com.example.nudorms.services;

import com.example.nudorms.models.*;
import com.example.nudorms.repositories.BuildingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class BuildingService {
  @Autowired
  BuildingRepository buildingRepository;
  @Autowired
  UserService userService;
  @Autowired
  PictureService pictureService;
  @Autowired
  ReviewService reviewService;

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
      Building oldBuilding = buildingList.get(buildingIdIndex);
      oldBuilding.setAddress(building.getAddress());
      oldBuilding.setAmenities(building.getAmenities());
      oldBuilding.setBuildingType(building.getBuildingType());
      oldBuilding.setMainImageUrl(building.getMainImageUrl());
      oldBuilding.setMinimumCost(building.getMinimumCost());
      oldBuilding.setName(building.getName());
      oldBuilding.setResidentTypes(building.getResidentTypes());
      oldBuilding.setRoomTypes(building.getRoomTypes());
      oldBuilding.setThumbnailImageUrl(building.getThumbnailImageUrl());
      buildingRepository.save(oldBuilding);
      return 1;
    }
  }

  public Integer deleteBuilding(Integer buildingId) {
    Building building = this.findBuildingById(buildingId);

    Set<User> bookmarkUsers = building.getBookmarkUsers();
    for (User u: bookmarkUsers) {
      userService.removeBookmarkForUser(u.getUsername(), buildingId);
    }

    Set<Picture> pictures = building.getPictures();
    for (Picture p : pictures) {
      pictureService.deletePicture(p.getId());
    }

    Set<Review> reviews = building.getReviews();
    for (Review r : reviews) {
      reviewService.deleteReview(r.getId());
    }

    buildingRepository.deleteById(buildingId);
    return 1;
  }

  public Integer addReviewForBuilding(Integer buildingId, Review review) {
    Building building = this.findBuildingById(buildingId);
    building.addReview(review);
    buildingRepository.save(building);
    return 1;
  }

  public Integer addBookmarkUser(String username, Integer buildingId) {
    User user = userService.findUserByUsername(username);
    Building building = this.findBuildingById(buildingId);
    building.addBookmarkUser(user);
    buildingRepository.save(building);
    return 1;
  }

  public Integer removeBookmarkUser(String username, Integer buildingId) {
    User user = userService.findUserByUsername(username);
    Building building = this.findBuildingById(buildingId);

    if (building.removeBookmarkUser(user)) {
      buildingRepository.save(building);
      return 1;
    } else {
      return 0;
    }
  }
}