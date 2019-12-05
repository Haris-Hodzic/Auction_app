package com.abhinternship.auctionapp.repository;

import com.abhinternship.auctionapp.model.Bid;
import com.abhinternship.auctionapp.model.Product;
import com.abhinternship.auctionapp.model.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BidRepository extends JpaRepository<Bid, Long> {
    List<Bid> findAllBidByProduct(Product product);
    List<Bid> getAllByBidder(User user, Pageable pageable);
}
