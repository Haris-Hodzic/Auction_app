package com.abhinternship.auctionapp.service;

import com.abhinternship.auctionapp.exception.RepositoryException;
import com.abhinternship.auctionapp.model.ColorDto;
import com.abhinternship.auctionapp.model.Product;
import com.abhinternship.auctionapp.model.SizeDto;
import com.abhinternship.auctionapp.model.SubcategoryDto;
import com.abhinternship.auctionapp.model.filter.ProductSpecification;
import com.abhinternship.auctionapp.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;


public class ProductService implements BaseService<Product> {
    @Autowired
    ProductRepository repository;

    ProductSpecification productSpecification = new ProductSpecification();


    @Override
    public Product getById(Long requestId) throws RepositoryException {
        Optional<Product> result = repository.findById(requestId);
        try {
            if (result.isPresent()) {
                Product productOptional = result.get();
                return productOptional;
            }
        } catch (Exception e) {
            throw new RepositoryException("No products found");
        }
        return null;
    }

    @Override
    public boolean create(LinkedHashMap request) {
        //TODO
        return false;
    }

    @Override
    public List<Product> getAll() throws RepositoryException {
        try {
            return repository.findAll();
        } catch (Exception e) {
            throw new RepositoryException("No products found");
        }
    }

    @Override
    public Product update(Integer id, Product request) {
        //TODO
        return null;
    }

    public List<Product> findAllProductByStartDateDesc(Long pageNumber) throws RepositoryException {
        Pageable page = PageRequest.of(Math.toIntExact(pageNumber), 8);
        try {
            return repository.getAllByOrderByStartDateDesc(page);
        } catch (Exception e) {
            throw new RepositoryException("No products found");
        }
    }

    public List<Product> findAllProductByEndDateAsc(Long pageNumber) throws RepositoryException {
        try {
            Pageable pageable = PageRequest.of(Math.toIntExact(pageNumber), 8);
            return repository.getAllByOrderByEndDateAsc(pageable);
        } catch (Exception e) {
            throw new RepositoryException("No products found");
        }
    }

    public Page<Product> getFilteredProducts(String category, String subcategory, String searchString, String startPrice, String endPrice, String color, String size, Long pageSize, String sortingType, String order) throws RepositoryException {
        try {
            productSpecification.setCategory(category);
            productSpecification.setSubcategory(subcategory);
            productSpecification.setSearchString(searchString);
            productSpecification.setStartPrice(startPrice);
            productSpecification.setEndPrice(endPrice);
            productSpecification.setColor(color);
            productSpecification.setSize(size);
            if (order.equals("ascending")) {
                Pageable pageable = PageRequest.of(0, Math.toIntExact(pageSize), Sort.by(sortingType).ascending());
                return repository.findAll(productSpecification, pageable);
            } else {
                Pageable pageable = PageRequest.of(0, Math.toIntExact(pageSize), Sort.by(sortingType).descending());
                return repository.findAll(productSpecification, pageable);
            }
        } catch (Exception e) {
            throw new RepositoryException("No products found");
        }
    }

    public List<ColorDto> getProductsColor() throws RepositoryException {
        try {
            return repository.getAllProductsCountedGroupByColor();
        } catch (Exception e) {
            throw new RepositoryException("No products found");
        }
    }

    public List<SizeDto> getProductsSize() throws RepositoryException {
        try {
            return repository.getAllProductsCountedGroupBySize();
        } catch (Exception e) {
            throw new RepositoryException("No products found");
        }
    }

    public List<SubcategoryDto> getDistinctSubcategories(String category) {
        return repository.getAllDistinctCountedGroupBySubcategory(category);
    }

    public List<Double> getAllPrices() {
        return repository.getAllPrices();
    }
}
