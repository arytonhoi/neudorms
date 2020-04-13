package com.example.course_editor.models;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="pictures")
public class Picture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JsonIgnore
    private Building building;
    private String url;     

    public Integer getId() {
        return this.id;
    }
    
    public Building getBuilding() {
        return this.building;
    }

    public void setBuilding(Building buidling) {
        this.building = buidling;
    }

    public String getUrl() {
        return this.url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
