package com.example.course_editor.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.course_editor.models.Picture;
import com.example.course_editor.services.PictureService;

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

  @PostMapping("/api/pictures")
  public Picture createPicture(@RequestBody Picture picture) {
    return pictureService.createPicture(picture);
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