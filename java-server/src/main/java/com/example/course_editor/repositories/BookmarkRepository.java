package com.example.course_editor.repositories;

import com.example.course_editor.models.Bookmark;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookmarkRepository extends CrudRepository<Bookmark, Integer> {

  @Query("SELECT bookmark FROM Bookmark bookmark")
  public List<Bookmark> findAllBookmarks();

  @Query("SELECT bookmark FROM Bookmark bookmark WHERE bookmark.user.username=:username")
  public List<Bookmark> findBookmarksForUser(@Param("username") String username);
}