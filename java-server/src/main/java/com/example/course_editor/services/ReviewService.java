package com.example.course_editor.services;

import com.example.course_editor.models.*;
import com.example.course_editor.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.Document.Type;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.Sentiment;

@Service
public class ReviewService {
  @Autowired
  ReviewRepository reviewRepository;
  @Autowired
  UserService userService;
  @Autowired
  BuildingService buildingService;

  public Review createReview(Integer buildingId, Review review) throws Exception {
    User user = userService.findUserByUsername(review.getUsername());
    userService.addReviewForUser(user.getUsername(), review);
    buildingService.addReviewForBuilding(buildingId, review);
    review.setBuilding(buildingService.findBuildingById(buildingId));
    review.setUser(user);

    LanguageServiceClient language = LanguageServiceClient.create();
    Document doc = Document.newBuilder().setContent(review.getText()).setType(Type.PLAIN_TEXT).build();

    // Detects the sentiment of the text
    Sentiment sentiment = language.analyzeSentiment(doc).getDocumentSentiment();

    // System.out.printf("Text: %s%n", text);
    // System.out.printf("Sentiment: %s, %s%n", sentiment.getScore(), sentiment.getMagnitude());

    review.setSentiment((double) sentiment.getScore());
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
      try {
        this.createReview(oldReview.getBuilding().getId(), review);
      } catch (Exception e) {
        return 0;
      }
      
      return 1;
    }
  }
}