package com.example.course_editor.services;

import com.example.course_editor.models.User;
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

  public int updateUser(Integer userId, User user) {
    // make sure user exists
    int userIdIndex = -1;
    List<User> userList = this.findAllUsers();
    for (int i = 0; i < userList.size(); i++) {
      User u = userList.get(i);
      if (u.getId() == userId) {
        userId = i;
        break;
      }
    }

    if (userIdIndex == -1) {
      return 0;
    } else {
      // User b = this.findUserById(userIdIndex);
      this.deleteUser(userId);
      this.createUser(user);
      return 1;
    }
  }

  public Integer deleteUser(Integer userId) {
    userRepository.deleteById(userId);
    return 1;
  }

  public User findUserById(Integer userId) {
    return userRepository.findUserById(userId);
  }
}