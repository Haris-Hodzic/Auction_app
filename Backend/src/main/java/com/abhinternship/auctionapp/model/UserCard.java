package com.abhinternship.auctionapp.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "card")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class UserCard {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String email;
    private String cardName;
    private String customerId;
    private String cardId;
    private String cardFingerprint;
    private String cardNumber;
    private String cvc;
    private String expireDate;

    public UserCard(String email, String cardName, String customerId, String cardId, String cardFingerprint, String cardNumber, String cvc, String expireDate) {
        this.email = email;
        this.cardName = cardName;
        this.customerId = customerId;
        this.cardId = cardId;
        this.cardFingerprint = cardFingerprint;
        this.cardNumber = cardNumber;
        this.cvc = cvc;
        this.expireDate = expireDate;
    }

    public UserCard() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getCardId() {
        return cardId;
    }

    public void setCardId(String cardId) {
        this.cardId = cardId;
    }

    public String getCardFingerprint() {
        return cardFingerprint;
    }

    public void setCardFingerprint(String cardFingerprint) {
        this.cardFingerprint = cardFingerprint;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getCvc() {
        return cvc;
    }

    public void setCvc(String cvc) {
        this.cvc = cvc;
    }

    public String getExpireDate() {
        return expireDate;
    }

    public void setExpireDate(String expireDate) {
        this.expireDate = expireDate;
    }

    public String getCardName() {
        return cardName;
    }

    public void setCardName(String cardName) {
        this.cardName = cardName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
