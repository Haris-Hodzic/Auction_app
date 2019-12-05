package com.abhinternship.auctionapp.service;

import com.abhinternship.auctionapp.exception.RepositoryException;
import com.abhinternship.auctionapp.model.Bid;
import com.abhinternship.auctionapp.model.BidRequest;
import com.abhinternship.auctionapp.model.Product;
import com.abhinternship.auctionapp.model.User;
import com.abhinternship.auctionapp.repository.BidRepository;
import com.abhinternship.auctionapp.repository.ProductRepository;
import com.abhinternship.auctionapp.repository.UserRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

public class BidService implements BaseService<Bid> {
    @Autowired
    BidRepository bidRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ProductRepository productRepository;

    @Override
    public Bid getById(Long requestId) {
        //TODO
        return null;
    }

    @Override
    public boolean create(LinkedHashMap request) throws RepositoryException {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            BidRequest req = objectMapper.convertValue(request, new TypeReference<BidRequest>() {
            });
            String userEmail = req.getUserEmail();
            User bidder = userRepository.getOneByEmail(userEmail);
            Product product = req.getProduct();
            User creator = userRepository.getOneByEmail(product.getUser().getEmail());
            Double price = req.getPrice();
            Date date = req.getDate();
            DateFormat fmt = new SimpleDateFormat("dd-MM-yyyy");

            if (price > product.getHighestBid()) {
                product.setHighestBid(price);
                int numberOfBids = product.getNumberOfBids() + 1;
                System.out.println(numberOfBids);
                product.setNumberOfBids(numberOfBids);
                product.setUser(creator);
                productRepository.save(product);
                Bid bid = new Bid(price, date, bidder, product);
                bidRepository.save(bid);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            throw new RepositoryException(e.getMessage());
        }
    }

    @Override
    public List<Bid> getAll() throws RepositoryException {
        try {
            return bidRepository.findAll();
        } catch (Exception e) {
            throw new RepositoryException("No bids found");
        }
    }

    public List<Bid> getAllByProductId(Long productId) throws RepositoryException {
        try {

        } catch (Exception e) {
            throw new RepositoryException("No bids found");
        }
        Optional<Product> productRequest = productRepository.findById(productId);
        if (productRequest.isPresent()) {
            Product product = productRequest.get();
            return bidRepository.findAllBidByProduct(product);
        } else {
            return new ArrayList<>();
        }
    }

    @Override
    public Bid update(Long id, LinkedHashMap request) {
        //TODO
        return null;
    }

    @Override
    public Boolean delete(LinkedHashMap request) throws RepositoryException {
        //TODO
        return false;
    }

    public List<Bid> getAllByUser(User user, Long pageSize) throws RepositoryException {
        Pageable pageable = PageRequest.of(0, Math.toIntExact(pageSize));
        return bidRepository.getAllByBidder(user, pageable);
    }
}
