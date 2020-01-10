package com.abhinternship.auctionapp.repository;

import com.abhinternship.auctionapp.model.Product;
import com.abhinternship.auctionapp.model.User;
import com.abhinternship.auctionapp.model.Wishlist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    Page<Wishlist> getAllByUserId(Long userId, Pageable pageable);
    Boolean existsByProductId(Long productId);
    Long deleteByProductId(Long productId);
}
