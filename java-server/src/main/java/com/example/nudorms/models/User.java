package com.example.nudorms.models;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {
    @Id
    private String username;
    private String password;
    private String name;
    private String major;
    private Integer year;
    @OneToMany(mappedBy = "user")
    private Set<Review> reviews;
    @ManyToMany
    @JoinTable(
        name = "bookmarks", 
        joinColumns = @JoinColumn(name = "username"),
        inverseJoinColumns = @JoinColumn(name = "buildingId")
    )
    private Set<Building> bookmarkedBuildings;

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

    public Integer getYear() {
        return this.year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Set<Building> getBookmarkedBuildings() {
        return this.bookmarkedBuildings;
    }

    public void addBookmark(Building building) {
        this.bookmarkedBuildings.add(building);
    }

    public Boolean removeBookmark(Building building) {
        return this.bookmarkedBuildings.removeIf(b -> b.getId() == building.getId());
    }

    public Set<Review> getReviews() {
        return this.reviews;
    }

    public void addReview(Review review) {
        this.reviews.add(review);
    }
}
