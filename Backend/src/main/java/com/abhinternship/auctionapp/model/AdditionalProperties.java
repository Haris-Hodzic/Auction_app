package com.abhinternship.auctionapp.model;

import javax.persistence.*;

@Entity
@Table(name = "properties")
public class AdditionalProperties {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String color;
    private String size;

    public AdditionalProperties(String color, String size) {
        this.color = color;
        this.size = size;
    }

    public AdditionalProperties() {
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
