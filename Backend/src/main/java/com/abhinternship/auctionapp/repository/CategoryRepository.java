package com.abhinternship.auctionapp.repository;

import com.abhinternship.auctionapp.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category getOneByName(String name);
}
