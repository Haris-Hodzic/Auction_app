package com.abhinternship.auctionapp.model;

public class AuctionNotification {
    private String user;
    private String productName;
    private Long productId;

    public AuctionNotification(String user, String productName, Long productId) {
        this.user = user;
        this.productName = productName;
        this.productId = productId;
    }

    public AuctionNotification() {
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }
}
