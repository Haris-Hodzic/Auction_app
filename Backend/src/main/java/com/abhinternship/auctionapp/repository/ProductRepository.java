package com.abhinternship.auctionapp.repository;

import com.abhinternship.auctionapp.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("FROM Product ORDER BY startDate DESC")
    List<Product> findAllProductByStartDateDesc(Pageable pageable);
    @Query("FROM Product ORDER BY endDate ASC")
    List<Product> findAllProductByEndDateAsc(Pageable pageable);
}
