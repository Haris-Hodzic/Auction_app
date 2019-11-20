package com.abhinternship.auctionapp.service;

import com.abhinternship.auctionapp.exception.RepositoryException;
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
    public Product getById(Long requestId) throws RepositoryException{
        Optional<Product> result = repository.findById(requestId);
        try {
            if (result.isPresent()) {
                Product productOptional = result.get();
                return productOptional;
            }
        }catch (Exception e) {
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
    public List<Product> getAll() throws RepositoryException{
        try {
            return repository.findAll();
        }catch (Exception e){
            throw new RepositoryException("No products found");
        }
    }

    @Override
    public Product update(Integer id, Product request) {
        //TODO
        return null;
    }

    public List<Product> findAllProductByStartDateDesc(Long pageNumber) throws RepositoryException{
        Pageable page = PageRequest.of(Math.toIntExact(pageNumber), 8);
        try {
            return repository.getAllByOrderByStartDateDesc(page);
        }catch (Exception e){
            throw new RepositoryException("No products found");
        }
    }

    public List<Product> findAllProductByEndDateAsc(Long pageNumber) throws RepositoryException{
        try {
            Pageable page = PageRequest.of(Math.toIntExact(pageNumber), 8);
            return repository.getAllByOrderByEndDateAsc(page);
        }catch (Exception e){
            throw new RepositoryException("No products found");
        }

    }
}
