package com.abhinternship.auctionapp.service;

import com.abhinternship.auctionapp.exception.RepositoryException;
import java.util.LinkedHashMap;
import java.util.List;

public interface BaseService<T> {
    T getById(Long requestId) throws RepositoryException;

    boolean create(LinkedHashMap request) throws RepositoryException;

    List<T> getAll() throws RepositoryException;

    T update(Long id, LinkedHashMap request);

    Boolean delete(Long id) throws RepositoryException;

}