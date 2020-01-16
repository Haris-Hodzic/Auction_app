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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    private void setBidAndProductInformation(Bid bid, Product product, Double price, User bidder, User creator) {
        product.setHighestBid(price);
        product.setHighestBidder(bidder.getEmail());
        int numberOfBids = product.getNumberOfBids() + 1;
        product.setNumberOfBids(numberOfBids);
        product.setUser(creator);
        productRepository.save(product);
        bidRepository.save(bid);
    }

    @Override
    public boolean create(LinkedHashMap request) throws RepositoryException {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            BidRequest req = objectMapper.convertValue(request, new TypeReference<BidRequest>() {
            });
            Product product = productRepository.getOne(req.getProductId());
            User creator = userRepository.getOneByEmail(product.getUser().getEmail());
            Double price = req.getPrice();
            String userEmail = req.getUserEmail();
            User bidder = userRepository.getOneByEmail(userEmail);
            Date date = req.getDate();
            if (bidRepository.existsByProduct(product) && bidRepository.existsByBidder(bidder)) {
                if (price > product.getHighestBid()) {
                    Bid bid = bidRepository.getBidByBidderAndProduct(bidder, product);
                    bid.setDate(date);
                    bid.setPrice(price);
                    this.setBidAndProductInformation(bid, product, price, bidder, creator);
                    return true;
                } else {
                    return false;
                }
            } else {
                if (price > product.getHighestBid()) {
                    Bid bid = new Bid(price, date, bidder, product);
                    this.setBidAndProductInformation(bid, product, price, bidder, creator);
                    return true;
                } else {
                    return false;
                }
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
            return bidRepository.findAllBidByProductId(productId);
        } catch (Exception e) {
            throw new RepositoryException("No bids found");
        }
    }

    @Override
    public Bid update(Long id, LinkedHashMap request) {
        //TODO
        return null;
    }

    @Override
    public void delete(Long bidId) throws RepositoryException {
        //TODO
    }

    public Page<Bid> getBidsByUser(Long userId, Long pageNumber) throws RepositoryException {
        try{
            Pageable pageable = PageRequest.of(Math.toIntExact(pageNumber), 5);
            return bidRepository.getAllByBidderIdOrderByDateDesc(userId, pageable);
        } catch (Exception e) {
            throw new RepositoryException("No bids found");
        }
    }
}
