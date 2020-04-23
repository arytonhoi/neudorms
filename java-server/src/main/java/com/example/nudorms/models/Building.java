package com.example.nudorms.models;

import javax.persistence.*;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
    // laundry, etc
    private String amenities;
    // freshman, grad, etc
    private String residentTypes;
    // economy, etc
    private String buildingType;
    // single, double, etc
    private String roomTypes;
    // cost of cheapest room
    private Integer minimumCost = 0;
    @OneToMany(mappedBy = "building")
    private Set<Picture> pictures;
    @OneToMany(mappedBy = "building")
    private Set<Review> reviews;
    @ManyToMany(mappedBy = "bookmarkedBuildings")
    @JsonIgnore
    private Set<User> bookmarkUsers;
    @Column(columnDefinition = "integer default -1")
    private Integer rating = -1;
    
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

    public Set<Picture> getPictures() {
        return this.pictures;
    }

    public void addPicture(Picture picture) {
        this.pictures.add(picture);
    }

    public Set<Review> getReviews() {
        return this.reviews;
    }

    public void addReview(Review review) {
        this.reviews.add(review);
        
        int numPositiveReviews = 0;
        for (Review r: this.reviews) {
            if (r.getSentiment() >= 0) {
                numPositiveReviews++;
            }
        }
        
        int rating = -1;
        if (this.reviews.size() > 0) {
            rating = (int) ((numPositiveReviews * 1.0 / this.reviews.size()) * 100);
        }
        
        this.setRating(rating);
    }

    public Set<User> getBookmarkUsers() {
        return this.bookmarkUsers;
    }

    public void addBookmarkUser(User user) {
        this.bookmarkUsers.add(user);
    }

    public Boolean removeBookmarkUser(User user) {
        return this.bookmarkUsers.removeIf(u -> u.getUsername().equals(user.getUsername()));
    }

    public String getAmenities() {
        return this.amenities;
    }

    public void setAmenities(String amenities) {
        this.amenities = amenities;
    }
    
    public String getResidentTypes() {
        return this.residentTypes;
    };

    public void setResidentTypes(String residentTypes) {
        this.residentTypes = residentTypes;
    };
    
    public String getBuildingType() {
        return this.buildingType;
    };

    public void setBuildingType(String buildingType) {
        this.buildingType = buildingType;
    }

    // single, double, etc
    public String getRoomTypes() {
        return this.roomTypes;
    };

    public void setRoomTypes(String roomTypes) {
        this.roomTypes = roomTypes;
    };

    // cost of cheapest room
    public Integer getMinimumCost() {
        return this.minimumCost;
    };

    public void setMinimumCost(Integer minimumCost) {
        this.minimumCost = minimumCost;
    }

    public Integer getRating() {
        return this.rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }
}
