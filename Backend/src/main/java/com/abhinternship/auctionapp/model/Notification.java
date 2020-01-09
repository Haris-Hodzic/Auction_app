package com.abhinternship.auctionapp.model;

public class Notification {
    private String user;
    private Long productId;
    private int numberOfBids;
    private Double highestBid;

    public Notification(String user, Long productId, int numberOfBids, Double highestBid) {
        this.user = user;
        this.productId = productId;
        this.numberOfBids = numberOfBids;
        this.highestBid = highestBid;
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

    public int getNumberOfBids() {
        return numberOfBids;
    }

    public void setNumberOfBids(int numberOfBids) {
        this.numberOfBids = numberOfBids;
    }

    public Double getHighestBid() {
        return highestBid;
    }

    public void setHighestBid(Double highestBid) {
        this.highestBid = highestBid;
    }
}
