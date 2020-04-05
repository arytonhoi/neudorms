// package com.example.course_editor.controllers;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;
// import com.example.course_editor.models.Widget;
// import com.example.course_editor.models.*;
// import com.example.course_editor.services.WidgetService;

// import java.util.List;

// @RestController
// @CrossOrigin(origins = "*")
// public class WidgetController {

//   @Autowired
//   WidgetService widgetService;

//   @PostMapping("/api/topics/{tid}/widgets")
//   public Widget createWidget(@PathVariable("tid") Integer topicId, @RequestBody Widget widget) {
//     return widgetService.createWidget(topicId, widget);
//   }

//   @GetMapping("/api/topics/{tid}/widgets")
//   public List<Widget> findWidgetsForTopic(@PathVariable("tid") Integer topicId) {
//     return widgetService.findWidgetsForTopic(topicId);
//   }

//   @PutMapping("/api/widgets/{wid}")
//   public int updateWidget(@PathVariable("wid") Integer wid, @RequestBody Widget widget) {
//     return widgetService.updateWidget(wid, widget);
//   }

//   @DeleteMapping("/api/widgets/{widgetId}")
//   public int deleteVidget(@PathVariable("widgetId") Integer wid) {
//     return widgetService.deleteWidget(wid);
//   }

//   @GetMapping("/api/widgets")
//   public List<Widget> findAllWidgets() {
//     return widgetService.findAllWidgets();
//   }

//   @GetMapping("/api/widgets/{widgetId}")
//   public Widget findWidgetById(@PathVariable("widgetId") Integer wid) {
//     return widgetService.findWidgetById(wid);
//   }
// }