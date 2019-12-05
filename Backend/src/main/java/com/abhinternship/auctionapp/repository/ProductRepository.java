package com.abhinternship.auctionapp.repository;

import com.abhinternship.auctionapp.model.*;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import org.springframework.data.domain.Pageable;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

    List<Product> getAllByOrderByStartDateDesc(Pageable pageable);

    @Query(value = "SELECT distinct new com.abhinternship.auctionapp.model.SubcategoryDto(d.name, count(d)) FROM Product e " +
            "JOIN Category d on  e.subcategory = d.id " +
            "JOIN Category s on e.category = s.id " +
            "where s.name=?1 group by d.name")
    List<SubcategoryDto> getAllDistinctCountedGroupBySubcategory(String category);

    @Query(value = "SELECT new com.abhinternship.auctionapp.model.ColorDto(d.color, COUNT(d)) " +
            "FROM Product AS e JOIN AdditionalProperties AS d ON e.additionalProperties = d.id GROUP BY d.color")
    List<ColorDto> getAllProductsCountedGroupByColor();

    @Query(value = "SELECT new com.abhinternship.auctionapp.model.SizeDto(d.size, count(d)) FROM Product e " +
            "JOIN AdditionalProperties d on  e.additionalProperties = d.id group by d.size")
    List<SizeDto> getAllProductsCountedGroupBySize();

    @Query(value = "select highest_bid from products order by highest_bid", nativeQuery = true)
    List<Double> getAllByOrderByHighestBid();

    List<Product> getAllByOrderByEndDateAsc(Pageable pageable);
}
