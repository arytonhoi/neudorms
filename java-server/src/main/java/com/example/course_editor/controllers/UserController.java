package com.example.course_editor.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.course_editor.models.*;
import com.example.course_editor.services.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

  @Autowired
  UserService userService;
  @Autowired
  ReviewService reviewService;
  @Autowired
  BuildingService buildingService;

  @GetMapping("/api/users")
  public List<User> findAllUsers() {
    return userService.findAllUsers();
  }

  @GetMapping("/api/users/{username}")
  public User findUserByUsername(@PathVariable("username") String username) {
    return userService.findUserByUsername(username);
  }

  @GetMapping("/api/users/{userId}/bookmarks")
  public List<Building> findBookmarksForUser(@PathVariable("userId") Integer userId) {
    return userService.findBookmarksForUser(userId);
  }
  
  @PutMapping("/api/users/{userId}/bookmarks")
  public Integer addUserBookmark(@PathVariable("userId") Integer userId, @RequestBody Building building) {
    userService.addBookmarkForUser(userId, building);
    return buildingService.addBookmarkUser(userId, building);  
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