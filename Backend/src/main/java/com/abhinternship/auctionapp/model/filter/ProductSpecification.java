package com.abhinternship.auctionapp.model.filter;

import com.abhinternship.auctionapp.model.Product;
import org.springframework.data.jpa.domain.Specification;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

public class ProductSpecification implements Specification<Product> {
    private String category;
    private String subcategory;
    private String searchString;
    private String startPrice;
    private String endPrice;
    private String color;
    private String size;

    @Override
    public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder builder) {
        List<Predicate> predicates = new ArrayList<>();
        if (!category.isEmpty()) {
            predicates.add(builder.equal(
                    root.get("category").get("name"), category));
        }
        if (!subcategory.isEmpty()) {
            predicates.add(builder.equal(
                    root.get("subcategory").get("name"), subcategory));
        }
        if (!searchString.isEmpty()) {
            predicates.add(builder.equal(
                    root.get("name"), searchString));
            System.out.println(root.get("name").getJavaType());
        }
        if (!startPrice.isEmpty() && !endPrice.isEmpty()) {
            predicates.add(builder.between(
                    root.get("highestBid"), Double.parseDouble(startPrice), Double.parseDouble(endPrice)));
        } else if (!startPrice.isEmpty()) {
            predicates.add(builder.greaterThanOrEqualTo(
                    root.get("highestBid"), startPrice));
        } else if (!endPrice.isEmpty()) {
            predicates.add(builder.lessThanOrEqualTo(
                    root.get("highestBid"), endPrice));
        }
        if (!color.isEmpty()) {
            predicates.add(builder.equal(
                    root.get("additionalProperties").get("color"), color));
        }
        if (!size.isEmpty()) {
            predicates.add(builder.equal(
                    root.get("additionalProperties").get("size"), size));
        }

        return builder.and(predicates.toArray(new Predicate[0]));
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSearchString() {
        return searchString;
    }

    public void setSearchString(String searchString) {
        this.searchString = searchString;
    }


    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getStartPrice() {
        return startPrice;
    }

    public void setStartPrice(String startPrice) {
        this.startPrice = startPrice;
    }

    public String getEndPrice() {
        return endPrice;
    }

    public void setEndPrice(String endPrice) {
        this.endPrice = endPrice;
    }

    public String getSubcategory() {
        return subcategory;
    }

    public void setSubcategory(String subcategory) {
        this.subcategory = subcategory;
    }
}
