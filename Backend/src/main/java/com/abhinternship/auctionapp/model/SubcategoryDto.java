package com.abhinternship.auctionapp.model;

public class SubcategoryDto {
    private String subcategory;
    private Long counter;

    public SubcategoryDto() {
    }

    public SubcategoryDto(String subcategory, Long counter) {
        this.subcategory = subcategory;
        this.counter = counter;
    }

    public void setSubcategory(String subcategory) {
        this.subcategory = subcategory;
    }

    public void setCounter(Long counter) {
        this.counter = counter;
    }

    public String getSubcategory() {
        return subcategory;
    }

    public Long getCounter() {
        return counter;
    }
}
