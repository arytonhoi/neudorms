package com.example.nudorms.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.nudorms.models.Picture;
import com.example.nudorms.services.PictureService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class PictureController {

  @Autowired
  PictureService pictureService;

  @GetMapping("/api/pictures")
  public List<Picture> findAllPictures() {
    return pictureService.findAllPictures();
  }

  @GetMapping("/api/buildings/{buildingId}/pictures")
  public List<Picture> findPicturesForBuilding(@PathVariable("buildingId") Integer buildingId) {
    return pictureService.findPicturesForBuilding(buildingId);
  }

  @PostMapping("/api/buildings/{buildingId}/pictures")
  public Picture createPicture(@PathVariable("buildingId") Integer buildingId, @RequestBody Picture picture) {
    return pictureService.createPicture(buildingId, picture);
  }

  @PutMapping("/api/pictures/{pictureId}")
  public Integer updatePicture(@PathVariable("pictureId") Integer pictureId, @RequestBody Picture picture) {
    return pictureService.updatePicture(pictureId, picture);
  }

  @DeleteMapping("/api/pictures/{pictureId}")
  public Integer deletePicture(@PathVariable("pictureId") Integer pictureId) {
    return pictureService.deletePicture(pictureId);
  }
}