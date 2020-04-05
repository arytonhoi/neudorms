// package com.example.course_editor.services;

// import com.example.course_editor.models.Widget;
// import com.example.course_editor.models.Topic;
// import com.example.course_editor.repositories.WidgetRepository;
// import com.example.course_editor.repositories.TopicRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.util.List;

// @Service
// public class WidgetService {
//   @Autowired
//   WidgetRepository widgetRepository;
//   @Autowired
//   TopicRepository topicRepository;

//   public Widget createWidget(Integer tid, Widget newWidget) {
//     newWidget.setTopic(topicRepository.findTopicById(tid));
//     return widgetRepository.save(newWidget);
//   }

//   public int deleteWidget(Integer wid) {
//     widgetRepository.deleteById(wid);
//     return 1;
//   }

//   public int updateWidget(Integer wid, Widget widget) {
//     int widIndex = -1;
//     List<Widget> widgetList = this.findAllWidgets();
//     for (int i = 0; i < widgetList.size(); i++) {
//       Widget w = widgetList.get(i);
//       if (w.getId() == wid) {
//         widIndex = i;
//         break;
//       }
//     }

//     if (widIndex == -1) {
//       return 0;
//     } else {
//       Widget w = this.findWidgetById(wid);
//       Topic topic = w.getTopic();
//       this.createWidget(topic.getId(), widget);
//       return 1;
//     }
//   }
  
//   public List<Widget> findAllWidgets() {
//     return (List<Widget>) widgetRepository.findAll();
//   }

//   public List<Widget> findWidgetsForTopic(Integer topicId) {
//     return widgetRepository.findWidgetsForTopic(topicId);
//   }

//   public Widget findWidgetById(Integer wid) {
//     return widgetRepository.findWidgetById(wid);
//   }
// }