package com.abhinternship.auctionapp.model;

import java.io.Serializable;

public class JwtResponse implements Serializable {
    private static final long serialVersionUid = -8091879091924046844L;
    private final String jwtToken;

    public JwtResponse(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public String getToken() {
        return this.jwtToken;
    }
}