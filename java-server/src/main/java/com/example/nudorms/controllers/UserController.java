package com.example.nudorms.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.nudorms.models.*;
import com.example.nudorms.services.*;

import java.util.List;

import javax.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "http://localhost:3000/", allowCredentials = "true") // need to specify origin URL to allow cookies
public class UserController {

  @Autowired
  UserService userService;
  @Autowired
  ReviewService reviewService;
  @Autowired
  BuildingService buildingService;

  @PostMapping("/api/users/register")
  public User register(HttpSession session, @RequestBody User user) {
    User newUser = userService.createUser(user);
    newUser.setPassword("***");
    session.setAttribute("profile", newUser);
    return newUser;
  }

  @PostMapping("/api/users/profile")
  public User profile(HttpSession session) {
    User profile = (User)session.getAttribute("profile");

    // Solve review JSON writing error
    User actualUser = userService.findUserByUsername(profile.getUsername());
    if (actualUser != null) {
      actualUser.setPassword("***");
      return actualUser;
    } else {
      return null;
    }
  }

  @PostMapping("/api/users/login")
  public Integer login(HttpSession session, @RequestBody User user) {
    User newUser = userService.login(user);
    if (newUser != null) {
      newUser.setPassword("***");
      session.setAttribute("profile", newUser);
      return 1;
    } else {
      return 0;
    }
  }

  @PostMapping("/api/users/logout")
  public User logout(HttpSession session) {
    User loggedOut = (User)session.getAttribute("profile");
    session.removeAttribute("profile");
    return loggedOut;
  }

  @GetMapping("/api/users")
  public List<User> findAllUsers() {
    return userService.findAllUsers();
  }

  @GetMapping("/api/users/{username}")
  public User findUserByUsername(@PathVariable("username") String username) {
    return userService.findUserByUsername(username);
  }

  @GetMapping("/api/users/{username}/bookmarks")
  public List<Building> findBookmarksForUser(@PathVariable("username") String username) {
    return userService.findBookmarksForUser(username);
  }
  
  @PutMapping("/api/users/{username}/bookmarks/{buildingId}")
  public Integer addUserBookmark(@PathVariable("username") String username, @PathVariable("buildingId") Integer buildingId) {
    userService.addBookmarkForUser(username, buildingId);
    return buildingService.addBookmarkUser(username, buildingId);  
  }

  @PostMapping("/api/users")
  public User createUser(@RequestBody User user) {
    return userService.createUser(user);
  }

  @PutMapping("/api/users/{username}")
  public Integer updateUser(@PathVariable("username") String username, @RequestBody User user) {
    return userService.updateUser(username, user);
  }

  @DeleteMapping("/api/users/{username}")
  public Integer deleteUser(@PathVariable("username") String username) {
    return userService.deleteUser(username);
  }
}