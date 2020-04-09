package com.example.course_editor.repositories;

import com.example.course_editor.models.Building;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BuildingRepository extends CrudRepository<Building, Integer> {

  @Query("SELECT building FROM Building building")
  public List<Building> findAllBuildings();

  @Query("SELECT building FROM Building building WHERE building.id=:buildingId")
  public Building findBuildingById(@Param("buildingId") Integer buildingId);

  // @Query("SELECT topic FROM Topic topic WHERE topic.lessonId=:lessonId")
  // public List<Topic> findTopicsForLesson(@Param("lessonId") String lessonId);
}