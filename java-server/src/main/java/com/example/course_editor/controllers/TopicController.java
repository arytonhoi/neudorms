package com.example.course_editor.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.course_editor.models.Topic;
import com.example.course_editor.services.TopicService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class TopicController {

  @Autowired
  TopicService topicService;

  @PostMapping("/api/lessons/{lid}/topics")
  public Topic createWidget(
      @PathVariable("lid") String lessonId, 
      @RequestBody Topic topic) {
    return topicService.createTopic(lessonId, topic);
  }

  @GetMapping("/api/lessons/{lid}/topics")
  public List<Topic> findTopicsForLesson(@PathVariable("lid") String lid) {
    return topicService.findTopicsForLesson(lid);
  }

  @PutMapping("/api/topics/{tid}")
  public int updateTopic(
      @PathVariable("wid") Integer tid, 
      @RequestBody Topic topic) {
    return topicService.updateTopic(tid, topic);
  }

  @DeleteMapping("/api/topics/{tid}")
  public int deleteVidget(@PathVariable("tid") Integer tid) {
    return topicService.deleteTopic(tid);
  }

  @GetMapping("/api/topics")
  public List<Topic> findAllTopics() {
    return topicService.findAllTopics();
  }

  @GetMapping("/api/topics/{tid}")
  public Topic findTopicById(@PathVariable("tid") Integer tid) {
    return topicService.findTopicById(tid);
  }
}