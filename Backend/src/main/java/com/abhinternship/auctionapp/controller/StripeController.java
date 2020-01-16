package com.abhinternship.auctionapp.controller;

import com.abhinternship.auctionapp.model.CardDto;
import com.abhinternship.auctionapp.service.StripeService;
import com.stripe.model.Charge;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.LinkedHashMap;


@RestController
@RequestMapping(value = "/stripe")
public class StripeController {
    @Autowired
    private StripeService stripeService;

    @Value("${STRIPE_PUBLIC_KEY}")
    private String stripePublicKey;

    @CrossOrigin
    @PostMapping(value = "/charge/card")
    public Boolean chargeCard(@RequestParam(value = "customerId") String customerId,
                             @RequestParam(value = "amount") String amount,
                             @RequestParam(value = "productId") Long productId,
                             @RequestBody @Valid CardDto additionalInfo) throws Exception {
        return stripeService.chargeCard(customerId, Double.parseDouble(amount), productId, additionalInfo);
    }

    @PostMapping(value = "/charge/token")
    public Boolean chargeToken(@RequestParam(value = "stripeToken") String stripeToken,
                              @RequestParam(value = "amount") String amount,
                              @RequestParam(value = "productId") Long productId) throws Exception {
        return stripeService.chargeByToken(stripeToken, Double.parseDouble(amount), productId);
    }

    @PostMapping(value = "/card")
    public Boolean createCard(@RequestParam(value = "stripeToken") String stripeToken,
                             @RequestParam(value = "email") String email,
                             @RequestParam(value = "name") String name) throws Exception {
        return stripeService.createCustomer(stripeToken, email, name);
    }
}
