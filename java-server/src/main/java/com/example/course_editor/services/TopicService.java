// package com.example.course_editor.services;

// import com.example.course_editor.models.Topic;
// import com.example.course_editor.repositories.TopicRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.util.List;

// @Service
// public class TopicService {
//   @Autowired
//   TopicRepository topicRepository;

//   public Topic createTopic(String lid, Topic topic) {
//     topic.setLessonId(lid);
//     return topicRepository.save(topic);
//   }

//   public List<Topic> findTopicsForLesson(String lid) {
//     return topicRepository.findTopicsForLesson(lid);
//   }

//   public int updateTopic(int tid, Topic topic) {
//     int tidIndex = -1;
//     List<Topic> topicList = this.findAllTopics();
//     for (int i = 0; i < topicList.size(); i++) {
//       Topic t = topicList.get(i);
//       if (t.getId() == tid) {
//         tidIndex = i;
//         break;
//       }
//     }

//     if (tidIndex == -1) {
//       return 0;
//     } else {
//       Topic t = this.findTopicById(tid);
//       String lid = t.getLessonId();
//       this.deleteTopic(tid);
//       this.createTopic(lid, topic);
//       return 1;
//     }
//   }

//   public int deleteTopic(int tid) {
//     topicRepository.deleteById(tid);
//     return 1;
//   }

//   public Topic findTopicById(int tid) {
//     return topicRepository.findTopicById(tid);
//   }

//   public List<Topic> findAllTopics() {
//     return (List<Topic>) topicRepository.findAll();
//   }
// }