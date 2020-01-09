package com.abhinternship.auctionapp.service;

import com.abhinternship.auctionapp.exception.RepositoryException;
import com.abhinternship.auctionapp.model.CardDto;
import com.abhinternship.auctionapp.model.Product;
import com.abhinternship.auctionapp.model.User;
import com.abhinternship.auctionapp.model.UserCard;
import com.abhinternship.auctionapp.repository.ProductRepository;
import com.abhinternship.auctionapp.repository.UserCardRepository;
import com.abhinternship.auctionapp.repository.UserRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class StripeService {

    @Autowired
    public StripeService() {
        Stripe.apiKey = "sk_test_3QHudnuEojx9XZs8PczLithZ00kjnAipPF";
    }

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    UserCardRepository userCardRepository;

    public String chargeCard(String customerId, double amount, Long productId, CardDto additionalInfo) throws RepositoryException, StripeException {
        Map<String, Object> chargeParams = new HashMap<>();
        Customer savedCustomer = Customer.retrieve(customerId);
        Map<String, Object> params = new HashMap<>();
        Map<String, Object> billing = new HashMap<>();
        Card card = (Card) savedCustomer.getSources().retrieve(savedCustomer.getDefaultSource());
        card.setCountry(additionalInfo.getCountry());
        card.setAddressLine1(additionalInfo.getStreet());
        card.setAddressCity(additionalInfo.getCity());
        card.setAddressZip(additionalInfo.getZipCode());
        Map<String, Object> sourceParam = new HashMap<>();
        sourceParam.put("line1", additionalInfo.getStreet());
        sourceParam.put("city", additionalInfo.getCity());
        sourceParam.put("country", additionalInfo.getCountry());
        sourceParam.put("postal_code", additionalInfo.getZipCode());
        params.put("address", sourceParam);
        savedCustomer.update(params);
        String sourceCard = Customer.retrieve(customerId).getDefaultSource();
        chargeParams.put("amount", (int)(amount * 100));
        chargeParams.put("currency", "USD");
        //chargeParams.put("billing_details", params);
        chargeParams.put("source", sourceCard);
        chargeParams.put("customer", customerId);
        Charge charge = Charge.create(chargeParams);
        Product product = productRepository.getOne(productId);
        product.setStatus("paid");
        productRepository.save(product);
        return "Your payment was successful";
    }

    public String chargeByToken(String stripeToken, double amount, Long productId) throws RepositoryException, StripeException {
        Map<String, Object> chargeParams = new HashMap<>();
        chargeParams.put("amount", (int)(amount * 100));
        chargeParams.put("currency", "USD");
        chargeParams.put("source", stripeToken);
        Charge.create(chargeParams);
        Product product = productRepository.getOne(productId);
        product.setStatus("paid");
        productRepository.save(product);
        return "Your payment was successful";
    }
    public String createCustomer(String token, String email, String name) throws Exception {
        Map<String, Object> customerParams = new HashMap<String, Object>();
        if (userCardRepository.existsByEmail(email)){
            UserCard savedCard = userCardRepository.getOneByEmail(email);
            Customer savedCustomer = Customer.retrieve(savedCard.getCustomerId());
            savedCustomer.delete();
            customerParams.put("email", email);
            customerParams.put("source", token);
            customerParams.put("name", name);
            Customer customer = Customer.create(customerParams);
            Card stripeCard = (Card) customer.getSources().retrieve(customer.getDefaultSource());
            if (userCardRepository.existsByCardFingerprint(stripeCard.getFingerprint()) && !stripeCard.getFingerprint().equals(savedCard.getCardFingerprint())){
                customer.delete();
                return "This card already exists!";
            } else {
                savedCard.setCardName(stripeCard.getName());
                savedCard.setCustomerId(customer.getId());
                savedCard.setCardId(customer.getDefaultSource());
                savedCard.setCardFingerprint(stripeCard.getFingerprint());
                savedCard.setCardNumber("**** **** **** " + stripeCard.getLast4());
                savedCard.setExpireDate(stripeCard.getExpMonth() + "/" + stripeCard.getExpYear());
                userCardRepository.save(savedCard);
                return "You successfully updated your card";
            }
        } else {
            customerParams.put("email", email);
            customerParams.put("source", token);
            customerParams.put("name", name);
            Customer customer = Customer.create(customerParams);
            Card stripeCard = (Card) customer.getSources().retrieve(customer.getDefaultSource());
            if (userCardRepository.existsByCardFingerprint(stripeCard.getFingerprint())){
                customer.delete();
                return "This card already exists!";
            } else {
                UserCard userCard = new UserCard(email, stripeCard.getName(), customer.getId(), customer.getDefaultSource(), stripeCard.getFingerprint(), "**** **** **** " + stripeCard.getLast4(), "***", stripeCard.getExpMonth() + "/" + stripeCard.getExpYear());
                userCardRepository.save(userCard);
                User user = userRepository.getOneByEmail(email);
                user.setUserCard(userCard);
                userRepository.save(user);
                return "You successfully saved your card";
            }
        }
    }
}
