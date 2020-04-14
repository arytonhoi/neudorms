package com.example.course_editor.services;

import com.example.course_editor.models.User;
import com.example.course_editor.models.Building;
import com.example.course_editor.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
  @Autowired
  UserRepository userRepository;

  public User createUser(User user) {
    return userRepository.save(user);
  }

  public List<User> findAllUsers() {
    return (List<User>) userRepository.findAll();
  }

  public User findUserByUsername(String username) {
    return userRepository.findUserByUsername(username);
  }

  public List<Building> findBookmarksForUser(Integer userId) {
    return userRepository.findBookmarksForUser(userId);
  }

  public int updateUser(String username, User user) {
    // make sure user exists
    int userIdIndex = -1;
    List<User> userList = this.findAllUsers();
    for (int i = 0; i < userList.size(); i++) {
      User u = userList.get(i);
      if (u.getUsername().equals(username)) {
        userIdIndex = i;
        break;
      }
    }

    if (userIdIndex == -1) {
      return 0;
    } else {
      // User b = this.findUserById(userIdIndex);
      this.deleteUser(username);
      this.createUser(user);
      return 1;
    }
  }

  public Integer deleteUser(String username) {
    User user = this.findUserByUsername(username);
    userRepository.deleteById(user.getId());
    return 1;
  }
}