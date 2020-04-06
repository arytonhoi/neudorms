package com.example.course_editor.repositories;

import com.example.course_editor.models.Review;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewRepository extends CrudRepository<Review, Integer> {

  @Query("SELECT review FROM Review review")
  public List<Review> findAllReviews();

  @Query("SELECT review FROM Review review WHERE review.id=:reviewId")
  public Review findReviewById(@Param("reviewId") Integer reviewId);

  @Query("SELECT review FROM Review review WHERE review.building.id=:buildingId")
  public List<Review> findReviewsForBuilding(@Param("buildingId") Integer buildingId);

  @Query("SELECT review FROM Review review WHERE review.user.username=:username")
  public List<Review> findReviewsByUser(@Param("username") String username);
}