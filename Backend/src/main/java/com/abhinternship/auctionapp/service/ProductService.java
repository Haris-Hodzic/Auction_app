package com.abhinternship.auctionapp.service;

import com.abhinternship.auctionapp.model.Product;
import com.abhinternship.auctionapp.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;


public class ProductService implements BaseService<Product> {
    @Autowired
    ProductRepository repository;

    @Override
    public Product getById(Long requestId) {
        Optional<Product> result = repository.findById(requestId);
        if (result.isPresent()) {
            Product productOptional = result.get();
            return productOptional;
        } else {
            return null;
        }
    }

    @Override
    public Product create(LinkedHashMap request) {
        return null;
    }

    @Override
    public List<Product> getAll() {
        return repository.findAll();
    }

    @Override
    public Product update(Integer id, Product request) {
        return null;
    }

    public List<Product> findAllProductByStartDateDesc(Long pageNumber) {
        Pageable page = PageRequest.of(Math.toIntExact(pageNumber), 8);
        return repository.findAllByOrderByStartDateDesc(page);
    }

    public List<Product> findAllProductByEndDateAsc(Long pageNumber) {
        Pageable page = PageRequest.of(Math.toIntExact(pageNumber), 8);
        return repository.findAllByOrderByEndDateAsc(page);
    }
}
