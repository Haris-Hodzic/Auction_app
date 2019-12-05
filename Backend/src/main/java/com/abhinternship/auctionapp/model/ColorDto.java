package com.abhinternship.auctionapp.model;

public class ColorDto {
    private String color;
    private Long counter;

    public ColorDto() {
    }

    public ColorDto(String color, Long counter) {
        this.color = color;
        this.counter = counter;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Long getCounter() {
        return counter;
    }

    public void setCounter(Long counter) {
        this.counter = counter;
    }
}
