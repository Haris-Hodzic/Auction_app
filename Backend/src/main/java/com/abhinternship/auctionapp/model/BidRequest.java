package com.abhinternship.auctionapp.model;

import java.util.Date;

public class BidRequest {
    private Double price;
    private Product product;
    private String userEmail;
    private Date date;

    public BidRequest() {
    }

    public BidRequest(Double price, Date date, Product product, String userEmail) {
        this.price = price;
        this.product = product;
        this.userEmail = userEmail;
        this.date = date;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
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
