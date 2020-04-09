package com.example.course_editor.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.course_editor.models.Review;
import com.example.course_editor.services.ReviewService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class ReviewController {

  @Autowired
  ReviewService reviewService;

  @GetMapping("/api/reviews")
  public List<Review> findAllReviews() {
    return reviewService.findAllReviews();
  }

  @GetMapping("/api/{buildingId}/reviews")
  public List<Review> findReviewsForBuilding(@PathVariable("buildingId") Integer buildingId) {
    return reviewService.findReviewsForBuilding(buildingId);
  }  

  @GetMapping("/api/{username}/reviews")
  public List<Review> findReviewsByUser(@PathVariable("username") String username) {
    return reviewService.findReviewsByUser(username);
  }  

  @GetMapping("/api/reviews/{reviewId}")
  public Review findReviewById(@PathVariable("reviewId") Integer reviewId) {
    return reviewService.findReviewById(reviewId);
  }

  @PostMapping("/api/reviews/")
  public Review createReview(@RequestBody Review Review) {
    return reviewService.createReview(Review);
  }

  @PutMapping("/api/reviews/{reviewId}")
  public Integer updateReview(@PathVariable("reviewId") Integer reviewId, @RequestBody Review review) {
    return reviewService.updateReview(reviewId, review);
  }

  @DeleteMapping("/api/reviews/{reviewId}")
  public Integer deleteReview(@PathVariable("reviewId") Integer reviewId) {
    return reviewService.deleteReview(reviewId);
  }
}