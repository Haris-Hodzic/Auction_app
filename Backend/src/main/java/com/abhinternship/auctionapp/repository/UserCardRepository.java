package com.abhinternship.auctionapp.repository;

import com.abhinternship.auctionapp.model.UserCard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCardRepository extends JpaRepository<UserCard, Long> {
    Boolean existsByEmail(String email);
    UserCard getOneByEmail(String email);
    Boolean existsByCardFingerprint(String cardFingerprint);
}
