package com.example.course_editor.models;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String username;
    private String password;
    private String email;
    private String name;
    private String major;
    private String year;
    @OneToMany(mappedBy = "user")
    private Set<Review> reviews;
    @ManyToMany
    @JoinTable(
        name = "bookmarks", 
        joinColumns = @JoinColumn(name = "userId"), 
        inverseJoinColumns = @JoinColumn(name = "buildingId")
    )
    private Set<Building> bookmarkedBuildings;

    public Integer getId() {
        return this.id;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMajor() {
        return this.major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public String getYear() {
        return this.year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public Set<Building> getBookmarkedBuildings() {
        return this.bookmarkedBuildings;
    }

    public void addBookmark(Building building) {
        this.bookmarkedBuildings.add(building);
    }

    public Set<Review> getReviews() {
        return this.reviews;
    }

    public void addReview(Review review) {
        this.reviews.add(review);
    }
}
