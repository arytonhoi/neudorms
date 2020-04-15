package com.example.course_editor.services;

import com.example.course_editor.models.*;
import com.example.course_editor.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
  @Autowired
  ReviewRepository reviewRepository;
  @Autowired
  UserService userService;
  @Autowired
  BuildingService buildingService;

  public Review createReview(Integer buildingId, Review review) {
    User user = userService.findUserByUsername(review.getUsername());
    userService.addReviewForUser(user.getId(), review);
    buildingService.addReviewForBuilding(buildingId, review);
    review.setBuilding(buildingService.findBuildingById(buildingId));
    review.setUser(user);
    review.setSentiment("positive");
    return reviewRepository.save(review);
  }

  public Integer deleteReview(Integer reviewId) {
    reviewRepository.deleteById(reviewId);
    return 1;
  }

  public Review findReviewById(Integer reviewId) {
    return reviewRepository.findReviewById(reviewId);
  }

  public List<Review> findAllReviews() {
    return (List<Review>) reviewRepository.findAll();
  }

  public List<Review> findReviewsForBuilding(Integer buildingId) {
    return reviewRepository.findReviewsForBuilding(buildingId);
  }

  public List<Review> findReviewsByUser(String username) {
    return reviewRepository.findReviewsByUser(username);
  }

  public Integer updateReview(Integer reviewId, Review review) {
    int reviewIdIndex = -1;
    List<Review> reviewList = this.findAllReviews();
    for (int i = 0; i < reviewList.size(); i++) {
      Review r = reviewList.get(i);
      if (r.getId() == reviewId) {
        reviewIdIndex = i;
        break;
      }
    }

    if (reviewIdIndex == -1) {
      return 0;
    } else {
      Review oldReview = this.findReviewById(reviewId);
      this.deleteReview(reviewIdIndex);
      this.createReview(oldReview.getBuilding().getId(), review);
      return 1;
    }
  }
}