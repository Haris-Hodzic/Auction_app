package com.abhinternship.auctionapp.service;

import com.abhinternship.auctionapp.exception.RepositoryException;
import com.abhinternship.auctionapp.model.Category;
import com.abhinternship.auctionapp.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.LinkedHashMap;
import java.util.List;

public class CategoryService implements BaseService<Category> {

    @Autowired
    CategoryRepository repository;

    @Override
    public Category getById(Long requestId) throws RepositoryException {
        //TODO
        return null;
    }

    @Override
    public boolean create(LinkedHashMap request) throws RepositoryException {
        //TODO
        return false;
    }

    @Override
    public List<Category> getAll() throws RepositoryException {
        //TODO
        return null;
    }

    @Override
    public Category update(Long id, LinkedHashMap request) {
        //TODO
        return null;
    }

    @Override
    public void delete(Long id) throws RepositoryException {
        //TODO
    }

    public Category getByName(String name) {
        return repository.getOneByName(name);
    }
}
