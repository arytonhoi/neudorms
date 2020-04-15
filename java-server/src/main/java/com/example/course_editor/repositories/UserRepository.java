package com.example.course_editor.repositories;

import com.example.course_editor.models.User;
import com.example.course_editor.models.Building;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Integer> {

  @Query("SELECT user FROM User user")
  public List<User> findAllUsers();

  @Query("SELECT user FROM User user WHERE user.id=:userId")
  public User findUserById(@Param("userId") Integer userId);

  @Query("SELECT user FROM User user WHERE user.username=:username")
  public User findUserByUsername(@Param("username") String username);

  @Query("SELECT user.bookmarkedBuildings FROM User user WHERE user.id=:userId")
  public List<Building> findBookmarksForUser(@Param("userId") Integer userId);
}