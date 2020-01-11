package com.abhinternship.auctionapp.model;

import java.util.Date;

public class BidRequest {
    private Double price;
    private Long productId;
    private String userEmail;
    private Date date;

    public BidRequest() {
    }

    public BidRequest(Double price, Date date, Long product, String userEmail) {
        this.price = price;
        this.productId = product;
        this.userEmail = userEmail;
        this.date = date;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProduct(Long productId) {
        this.productId = productId;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
