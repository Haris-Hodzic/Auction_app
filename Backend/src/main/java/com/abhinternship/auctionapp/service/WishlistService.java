package com.abhinternship.auctionapp.service;

import com.abhinternship.auctionapp.exception.RepositoryException;
import com.abhinternship.auctionapp.model.Product;
import com.abhinternship.auctionapp.model.User;
import com.abhinternship.auctionapp.model.Wishlist;
import com.abhinternship.auctionapp.model.WishlistRequest;
import com.abhinternship.auctionapp.repository.UserRepository;
import com.abhinternship.auctionapp.repository.WishlistRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.LinkedHashMap;
import java.util.List;

public class WishlistService implements BaseService<Wishlist> {

    @Autowired
    WishlistRepository wishlistRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public Wishlist getById(Long requestId) throws RepositoryException {
        //TODO
        return null;
    }

    @Override
    public boolean create(LinkedHashMap request) throws RepositoryException {
        ObjectMapper objectMapper = new ObjectMapper();
        WishlistRequest req = objectMapper.convertValue(request, new TypeReference<WishlistRequest>() {
        });
        String userEmail = req.getUserEmail();
        User user = userRepository.getOneByEmail(userEmail);
        Product product = req.getProduct();
        if (wishlistRepository.existsByProductId(product.getId())) {
            return false;
        } else {
            Wishlist wishlist = new Wishlist(user, product);
            wishlistRepository.save(wishlist);
            return true;
        }
    }

    @Override
    public List<Wishlist> getAll() throws RepositoryException {
        try {
            return wishlistRepository.findAll();
        } catch (Exception e) {
            throw new RepositoryException("No products found");
        }
    }

    @Override
    public Wishlist update(Long id, LinkedHashMap request) {
        //TODO
        return null;
    }

    @Override
    public void delete(Long productId) throws RepositoryException {
        try {
            wishlistRepository.deleteByProductId(productId);
        } catch (Exception e) {
            throw new RepositoryException("This product can't be deleted from wishlist");
        }
    }

    public Page<Wishlist> getAllByUser(Long userId, Long pageNumber) throws RepositoryException {
        Pageable pageable = PageRequest.of(Math.toIntExact(pageNumber), 5);
        return wishlistRepository.getAllByUserId(userId, pageable);
    }

    public Boolean existInWishlist(Long productId) {
        return wishlistRepository.existsByProductId(productId);
    }
}