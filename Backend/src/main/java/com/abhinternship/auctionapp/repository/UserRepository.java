package com.abhinternship.auctionapp.repository;

import com.abhinternship.auctionapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    Boolean existsByEmail(String email);
    User getOneByEmail(String email);
}