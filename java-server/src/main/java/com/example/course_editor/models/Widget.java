package com.example.course_editor.models;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "widgets")
public class Widget {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  @ManyToOne
  @JsonIgnore
  private Topic topic;
  private String type = "HEADING";
  private String text = "New Widget";;
  private String url;
  @Column(nullable = true)
  private Integer size;
  @Column(nullable = true)
  private Integer displayOrder;
  @Column(nullable = true)
  private Integer width;
  @Column(nullable = true)
  private Integer height;
  private String cssClass;
  private String style = "UNORDERED";
  private String value;

  public Widget(Integer id) {
  }

  public Widget() {

  }

  public String getValue() {
    return value;
  }

  public void setValue(String value) {
    this.value = value;
  }

  public String getStyle() {
    return style;
  }

  public void setStyle(String style) {
    this.style = style;
  }

  public String getCssClass() {
    return cssClass;
  }

  public void setCssClass(String cssClass) {
    this.cssClass = cssClass;
  }

  public Integer getHeight() {
    return height;
  }

  public void setHeight(Integer height) {
    this.height = height;
  }

  public Integer getWidth() {
    return width;
  }

  public void setWidth(Integer width) {
    this.width = width;
  }

  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public Integer getDisplayOrder() {
    return displayOrder;
  }

  public void setDisplayOrder(Integer order) {
    this.displayOrder = order;
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  public Integer getSize() {
    return size;
  }

  public void setSize(Integer size) {
    this.size = size;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public Topic getTopic() {
    return topic;
  }

  public void setTopic(Topic topic) {
    this.topic = topic;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }
}