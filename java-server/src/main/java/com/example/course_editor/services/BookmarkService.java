package com.example.course_editor.services;

import com.example.course_editor.models.Bookmark;
import com.example.course_editor.repositories.BookmarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookmarkService {
  @Autowired
  BookmarkRepository bookmarkRepository;

  public Bookmark createBookmark(Bookmark bookmark) {
    return bookmarkRepository.save(bookmark);
  }

  public List<Bookmark> findAllBookmarks() {
    return (List<Bookmark>) bookmarkRepository.findAll();
  }

  public List<Bookmark> findBookmarksForUser(String username) {
    return bookmarkRepository.findBookmarksForUser(username);
  }

  public Integer deleteBookmark(Integer bookmarkId) {
    bookmarkRepository.deleteById(bookmarkId);
    return 1;
  }

}