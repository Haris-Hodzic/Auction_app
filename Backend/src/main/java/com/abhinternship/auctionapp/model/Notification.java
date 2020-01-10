package com.abhinternship.auctionapp.model;

public class Notification {
    private String user;
    private String productId;

    public Notification(String user, String productId) {
        this.user = user;
        this.productId = productId;
    }

    public Notification() {
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }
}
