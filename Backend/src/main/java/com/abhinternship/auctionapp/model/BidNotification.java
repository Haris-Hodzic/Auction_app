package com.abhinternship.auctionapp.model;

public class BidNotification extends Notification {
    private int numberOfBids;
    private Double highestBid;

    public BidNotification(String user, Long productId, int numberOfBids, Double highestBid) {
        super(user, productId);
        this.numberOfBids = numberOfBids;
        this.highestBid = highestBid;
    }

    public BidNotification() {
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
