package com.abhinternship.auctionapp.model;

public class SizeDto {
    private String size;
    private Long counter;

    public SizeDto(String size, Long counter) {
        this.size = size;
        this.counter = counter;
    }

    public SizeDto() {
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public Long getCounter() {
        return counter;
    }

    public void setCounter(Long counter) {
        this.counter = counter;
    }
}
