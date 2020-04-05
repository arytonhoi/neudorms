// package com.example.course_editor.repositories;

// import com.example.course_editor.models.Widget;
// import org.springframework.data.repository.CrudRepository;
// import org.springframework.data.repository.query.Param;
// import org.springframework.data.jpa.repository.Query;

// import java.util.List;

// public interface WidgetRepository extends CrudRepository<Widget, Integer> {

//   @Query("SELECT widget FROM Widget widget")
//   public List<Widget> findAllWidgets();

//   @Query("SELECT widget FROM Widget widget WHERE widget.id=:wid")
//   public Widget findWidgetById(@Param("wid") Integer wid);

//   @Query("SELECT widget FROM Widget widget WHERE widget.topic.id=:tid")
//   public List<Widget> findWidgetsForTopic(@Param("tid") Integer topicId);
// }