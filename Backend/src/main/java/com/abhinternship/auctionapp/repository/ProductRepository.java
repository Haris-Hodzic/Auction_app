package com.abhinternship.auctionapp.repository;

import com.abhinternship.auctionapp.model.ColorDto;
import com.abhinternship.auctionapp.model.Product;
import com.abhinternship.auctionapp.model.SizeDto;
import com.abhinternship.auctionapp.model.SubcategoryDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.domain.Pageable;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

    List<Product> getAllByOrderByStartDateDesc(Pageable pageable);

    @Query(value = "SELECT distinct d.name as subcategory, count(d) as counter FROM products e " +
            "JOIN category d on  e.subcategory_id = d.id " +
            "JOIN category s on e.category_id = s.id " +
            "where s.name=?1 group by d.name", nativeQuery = true)
    List<SubcategoryDto> getAllDistinctCountedGroupBySubcategory(String category);

    @Query(value = "SELECT d.color as color, count(d) as counter FROM products e " +
            "JOIN properties d on  e.properties_id = d.id group by d.color", nativeQuery = true)
    List<ColorDto> getAllProductsCountedGroupByColor();

    @Query(value = "SELECT d.size as size, count(d) as counter FROM products e " +
            "JOIN properties d on  e.properties_id = d.id group by d.size", nativeQuery = true)
    List<SizeDto> getAllProductsCountedGroupBySize();

    @Query(value = "select highest_bid from products order by highest_bid", nativeQuery = true)
    List<Double> getAllPrices();

    List<Product> getAllByOrderByEndDateAsc(Pageable pageable);
}