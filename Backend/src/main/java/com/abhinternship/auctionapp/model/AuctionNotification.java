package com.abhinternship.auctionapp.model;

public class AuctionNotification extends Notification{
    private String productName;

    public AuctionNotification(String user, String productName, Long productId) {
        super(user, productId);
        this.productName = productName;
    }

    public AuctionNotification() {
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

}
