package com.abhinternship.auctionapp.repository;

import com.abhinternship.auctionapp.model.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findAllByOrderByStartDateDesc(Pageable pageable);

    List<Product> findAllByOrderByEndDateAsc(Pageable pageable);
}
