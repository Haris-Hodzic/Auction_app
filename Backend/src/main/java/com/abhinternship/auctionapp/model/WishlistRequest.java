package com.abhinternship.auctionapp.model;

public class WishlistRequest {
    private Product product;
    private String userEmail;

    public WishlistRequest() {
    }

    public WishlistRequest(Product product, String userEmail) {
        this.product = product;
        this.userEmail = userEmail;
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
}
