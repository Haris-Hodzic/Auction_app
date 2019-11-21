package com.abhinternship.auctionapp.repository;

import com.abhinternship.auctionapp.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
