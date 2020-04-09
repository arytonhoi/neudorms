package com.example.course_editor.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.course_editor.models.Building;
import com.example.course_editor.services.BuildingService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class BuildingController {

  @Autowired
  BuildingService buildingService;

  @GetMapping("/api/buildings")
  public List<Building> findAllBuildings() {
    return buildingService.findAllBuildings();
  }

  @GetMapping("/api/buildings/{buildingId}")
  public Building findBuildingById(@PathVariable("buildingId") Integer buildingId) {
    return buildingService.findBuildingById(buildingId);
  }

  @PostMapping("/api/buildings/")
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

  // @GetMapping("/api/topics/{tid}/widgets")
  // public List<Widget> findWidgetsForTopic(@PathVariable("tid") Integer topicId) {
  //   return widgetService.findWidgetsForTopic(topicId);
  // }  
}