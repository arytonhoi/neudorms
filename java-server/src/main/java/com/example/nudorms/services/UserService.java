package com.example.nudorms.services;

import com.example.nudorms.models.*;
import com.example.nudorms.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
  @Autowired
  UserRepository userRepository;
  @Autowired
  BuildingService buildingService;

  public User createUser(User user) {
    return userRepository.save(user);
  }

  public List<User> findAllUsers() {
    return (List<User>) userRepository.findAll();
  }

  public User findUserByUsername(String username) {
    return userRepository.findUserByUsername(username);
  }

  public Integer addReviewForUser(String username, Review review) {
    User user = this.findUserByUsername(username);
    user.addReview(review);
    userRepository.save(user);
    return 1;
  }

  public Integer addBookmarkForUser(String username, Integer buildingId) {
    User user = this.findUserByUsername(username);
    Building building = buildingService.findBuildingById(buildingId);

    List<Building> bookmarkedBuildings = this.findBookmarksForUser(username);
    boolean buildingAlreadyBookmarked = false;
    for (Building currentBuilding : bookmarkedBuildings) {
      if (currentBuilding.getId().equals(buildingId)) {
        buildingAlreadyBookmarked = true;
      }
    }

    if (buildingAlreadyBookmarked) {
      return -1;
    } else {
      user.addBookmark(building);
      userRepository.save(user);
      return 1;
    }
  }

  public List<Building> findBookmarksForUser(String username) {
    return userRepository.findBookmarksForUser(username);
  }

  public Integer updateUser(String username, User newUser) {
    // make sure user exists
    int usernameIndex = -1;
    List<User> userList = this.findAllUsers();
    for (int i = 0; i < userList.size(); i++) {
      User u = userList.get(i);
      if (u.getUsername().equals(username)) {
        usernameIndex = i;
        break;
      }
    }

    if (usernameIndex == -1) {
      return 0;
    } else {
      User oldUser = userList.get(usernameIndex);
      oldUser.setName(newUser.getName());
      oldUser.setPassword(newUser.getPassword());
      oldUser.setMajor(newUser.getMajor());
      oldUser.setYear(newUser.getYear());
      userRepository.save(oldUser);
      return 1;
    }
  }

  public Integer deleteUser(String username) {
    User user = this.findUserByUsername(username);
    userRepository.deleteById(user.getUsername());
    return 1;
  }

  public User login(User user) {
    User actualUser = this.findUserByUsername(user.getUsername());
    if (actualUser != null && actualUser.getUsername().equals(user.getUsername())
            && actualUser.getPassword().equals(user.getPassword())) {
      return actualUser;
    } else {
      return null;
    }
  }
}
