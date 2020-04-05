package com.example.course_editor.models;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="buildings")
public class Building {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String address;
    @OneToMany(mappedBy = "building")
    private List<Picture> pictures;
    @OneToMany(mappedBy = "building")
    private List<Review> reviews;
    @OneToMany(mappedBy = "building")
    private List<Bookmark> bookmarks;
    
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<Picture> getPictures() {
        return this.pictures;
    }

    public void setPictures(List<Picture> pictures) {
        this.pictures = pictures;
    }

    public List<Review> getReviews() {
        return this.reviews;
    }

    public List<Bookmark> getBookmarks() {
        return this.bookmarks;
    }
}
