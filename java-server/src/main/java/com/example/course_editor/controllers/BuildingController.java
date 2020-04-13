package com.example.course_editor.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.course_editor.models.*;
import com.example.course_editor.services.BuildingService;
import com.example.course_editor.services.PictureService;
import com.example.course_editor.services.ReviewService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class BuildingController {

  @Autowired
  BuildingService buildingService;
  @Autowired
  ReviewService reviewService;
  @Autowired
  PictureService pictureService;

  @GetMapping("/api/buildings")
  public List<Building> findAllBuildings() {
    return buildingService.findAllBuildings();
  }

  @GetMapping("/api/buildings/{buildingId}")
  public Building findBuildingById(@PathVariable("buildingId") Integer buildingId) {
    return buildingService.findBuildingById(buildingId);
  }

  @GetMapping("/api/buildings/{buildingId}/reviews")
  public List<Review> findReviewsForBuilding(@PathVariable("buildingId") Integer buildingId) {
    return reviewService.findReviewsForBuilding(buildingId);
  }

  @GetMapping("/api/buildings/{buildingId}/pictures")
  public List<Picture> findPicturesForBuilding(@PathVariable("buildingId") Integer buildingId) {
    return pictureService.findPicturesForBuilding(buildingId);
  }

  @PostMapping("/api/buildings")
  public Building createBuilding(@RequestBody Building building) {
    return buildingService.createBuilding(building);
  }

  @PutMapping("/api/buildings/{buildingId}")
  public Integer updateBuilding(@PathVariable("buildingId") Integer buildingId, @RequestBody Building building) {
    return buildingService.updateBuilding(buildingId, building);
  }

  @DeleteMapping("/api/buildings/{buildingId}")
  public Integer deleteBuilding(@PathVariable("buildingId") Integer buildingId) {
    return buildingService.deleteBuilding(buildingId);
  }
}