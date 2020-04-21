package com.example.nudorms.services;

import com.example.nudorms.models.*;
import com.example.nudorms.repositories.PictureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PictureService {
  @Autowired
  PictureRepository pictureRepository;
  @Autowired
  BuildingService buildingService;

  public Picture createPicture(Integer buildingId, Picture picture) {
    Building building = buildingService.findBuildingById(buildingId);
    building.addPicture(picture);
    picture.setBuilding(building);
    return pictureRepository.save(picture);
  }

  public int updatePicture(Integer pictureId, Picture picture) {
    // make sure picture exists
    int pictureIdIndex = -1;
    List<Picture> pictureList = this.findAllPictures();
    for (int i = 0; i < pictureList.size(); i++) {
      Picture p = pictureList.get(i);
      if (p.getId() == pictureId) {
        pictureIdIndex = i;
        break;
      }
    }

    if (pictureIdIndex == -1) {
      return 0;
    } else {
      Picture oldPicture = pictureList.get(pictureIdIndex);
      oldPicture.setUrl(picture.getUrl());
      pictureRepository.save(oldPicture);
      return 1;
    }
  }

  public Integer deletePicture(Integer pictureId) {
    pictureRepository.deleteById(pictureId);
    return 1;
  }

  public List<Picture> findAllPictures() {
    return (List<Picture>) pictureRepository.findAll();
  }

  public List<Picture> findPicturesForBuilding(Integer buildingId) {
    return pictureRepository.findPicturesForBuilding(buildingId);
  }
}