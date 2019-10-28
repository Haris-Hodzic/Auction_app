package com.abhinternship.auctionapp.repository;

import com.abhinternship.auctionapp.model.Bid;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BidRepository extends JpaRepository<Bid, Long> {
}
