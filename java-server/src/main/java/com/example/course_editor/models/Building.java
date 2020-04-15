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
    private String thumbnailImageUrl;
    private String mainImageUrl;
    @OneToMany(mappedBy = "building")
    private List<Picture> pictures;
    @OneToMany(mappedBy = "building")
    private List<Review> reviews;
    @ManyToMany(mappedBy = "bookmarkedBuildings")
    private List<User> bookmarkUsers;
    
    public Integer getId() {
        return this.id;
    }

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

    public String getThumbnailImageUrl() {
        return this.thumbnailImageUrl;
    }

    public void setThumbnailImageUrl(String url) {
        this.thumbnailImageUrl = url;
    }

    public String getMainImageUrl() {
        return this.mainImageUrl;
    }

    public void setMainImageUrl(String url) {
        this.mainImageUrl = url;
    }

    public List<Picture> getPictures() {
        return this.pictures;
    }

    public void addPicture(Picture picture) {
        this.pictures.add(picture);
    }

    public List<Review> getReviews() {
        return this.reviews;
    }

    public void addReview(Review review) {
        this.reviews.add(review);
    }

    public List<User> getBookmarkUsers() {
        return this.bookmarkUsers;
    }

    public void addBookmarkUser(User user) {
        this.bookmarkUsers.add(user);
    }
}
