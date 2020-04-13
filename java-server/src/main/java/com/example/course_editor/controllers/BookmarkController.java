package com.example.course_editor.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.course_editor.models.Bookmark;
import com.example.course_editor.services.BookmarkService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class BookmarkController {

  @Autowired
  BookmarkService bookmarkService;

  @GetMapping("/api/bookmarks")
  public List<Bookmark> findAllBookmarks() {
    return bookmarkService.findAllBookmarks();
  }

  @PostMapping("/api/bookmarks")
  public Bookmark createBookmark(@RequestBody Bookmark bookmark) {
    return bookmarkService.createBookmark(bookmark);
  }

  @DeleteMapping("/api/bookmarks/{bookmarkId}")
  public Integer deleteBookmark(@PathVariable("bookmarkId") Integer bookmarkId) {
    return bookmarkService.deleteBookmark(bookmarkId);
  }
}