package com.abhinternship.auctionapp.model;

public class Notification {
    private String user;
    private Long productId;

    public Notification(String user, Long productId) {
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

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }
}
