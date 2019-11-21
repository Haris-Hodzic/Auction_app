package com.abhinternship.auctionapp.repository;

import com.abhinternship.auctionapp.model.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
}
