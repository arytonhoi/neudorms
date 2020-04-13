package com.example.course_editor.repositories;

import com.example.course_editor.models.Picture;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PictureRepository extends CrudRepository<Picture, Integer> {

  @Query("SELECT picture FROM Picture picture")
  public List<Picture> findAllPictures();

  @Query("SELECT picture FROM Picture picture WHERE picture.building.id=:buildingId")
  public List<Picture> findPicturesForBuilding(@Param("buildingId") Integer buildingId);
}