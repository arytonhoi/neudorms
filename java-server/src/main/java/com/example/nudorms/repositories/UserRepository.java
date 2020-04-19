package com.example.nudorms.repositories;

import com.example.nudorms.models.User;
import com.example.nudorms.models.Building;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends CrudRepository<User, String> {

  @Query("SELECT user FROM User user")
  public List<User> findAllUsers();

  @Query("SELECT user FROM User user WHERE user.username=:username")
  public User findUserByUsername(@Param("username") String username);

  @Query("SELECT user.bookmarkedBuildings FROM User user WHERE user.id=:username")
  public List<Building> findBookmarksForUser(@Param("username") String username);
}