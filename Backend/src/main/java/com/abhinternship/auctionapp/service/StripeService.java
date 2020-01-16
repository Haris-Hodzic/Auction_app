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
import com.stripe.model.Card;
import com.stripe.model.Charge;
import com.stripe.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class StripeService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    UserCardRepository userCardRepository;

    @Autowired
    public StripeService() {
        Stripe.apiKey = "sk_test";
    }

    public Boolean chargeCard(String customerId, double amount, Long productId, CardDto additionalInfo) throws RepositoryException, StripeException {
        try {
            Map<String, Object> chargeParams = new HashMap<>();
            Customer savedCustomer = Customer.retrieve(customerId);
            Map<String, Object> params = new HashMap<>();
            Map<String, Object> sourceParam = new HashMap<>();
            sourceParam.put("line1", additionalInfo.getStreet());
            sourceParam.put("city", additionalInfo.getCity());
            sourceParam.put("country", additionalInfo.getCountry());
            sourceParam.put("postal_code", additionalInfo.getZipCode());
            params.put("address", sourceParam);
            savedCustomer.update(params);
            chargeParams.put("amount", (int) (amount * 100));
            chargeParams.put("currency", "USD");
            chargeParams.put("source", savedCustomer.getDefaultSource());
            chargeParams.put("customer", customerId);
            Charge.create(chargeParams);
            if (productId > 0) {
                Product product = productRepository.getOne(productId);
                product.setStatus("paid");
                productRepository.save(product);
            }
            return true;
        } catch (Exception e) {
            throw new RepositoryException("Payment was not successful!");
        }
    }

    public Boolean chargeByToken(String stripeToken, double amount, Long productId) throws RepositoryException, StripeException {
        try {
            Map<String, Object> chargeParams = new HashMap<>();
            chargeParams.put("amount", (int) (amount * 100));
            chargeParams.put("currency", "USD");
            chargeParams.put("source", stripeToken);
            Charge.create(chargeParams);
            if (productId > 0) {
                Product product = productRepository.getOne(productId);
                product.setStatus("paid");
                productRepository.save(product);
            }
            return true;
        } catch (Exception e) {
            throw new RepositoryException("Payment was not successful!");
        }
    }

    public Boolean createCustomer(String token, String email, String name) throws Exception {
        Map<String, Object> customerParams = new HashMap<String, Object>();
        if (userCardRepository.existsByEmail(email)) {
            try {
                UserCard savedCard = userCardRepository.getOneByEmail(email);
                customerParams.put("email", email);
                customerParams.put("source", token);
                customerParams.put("name", name);
                Customer customer = Customer.create(customerParams);
                Card stripeCard = (Card) customer.getSources().retrieve(customer.getDefaultSource());
                if (userCardRepository.existsByCardFingerprint(stripeCard.getFingerprint()) && !stripeCard.getFingerprint().equals(savedCard.getCardFingerprint())) {
                    customer.delete();
                    throw new RepositoryException("This card already exists!");
                } else {
                    Customer savedCustomer = Customer.retrieve(savedCard.getCustomerId());
                    savedCustomer.delete();
                    savedCard.setCardName(stripeCard.getName());
                    savedCard.setCustomerId(customer.getId());
                    savedCard.setCardFingerprint(stripeCard.getFingerprint());
                    savedCard.setCardNumber(stripeCard.getLast4());
                    savedCard.setExpireDate(stripeCard.getExpMonth() + "/" + stripeCard.getExpYear());
                    userCardRepository.save(savedCard);
                    return true;
                }
            } catch (Exception e) {
                throw new RepositoryException(e.getMessage());
            }
        } else {
            try {
                customerParams.put("email", email);
                customerParams.put("source", token);
                customerParams.put("name", name);
                Customer customer = Customer.create(customerParams);
                Card stripeCard = (Card) customer.getSources().retrieve(customer.getDefaultSource());
                if (userCardRepository.existsByCardFingerprint(stripeCard.getFingerprint())) {
                    customer.delete();
                    throw new RepositoryException("This card already exists!");
                } else {
                    UserCard userCard = new UserCard(email, stripeCard.getName(), customer.getId(), stripeCard.getFingerprint(), stripeCard.getLast4(), stripeCard.getExpMonth() + "/" + stripeCard.getExpYear());
                    userCardRepository.save(userCard);
                    User user = userRepository.getOneByEmail(email);
                    user.setUserCard(userCard);
                    userRepository.save(user);
                    return true;
                }
            } catch (Exception e) {
                throw new RepositoryException(e.getMessage());
            }
        }
    }
}
