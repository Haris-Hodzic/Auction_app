package com.abhinternship.auctionapp.service;

import java.util.LinkedHashMap;
import java.util.List;

public interface BaseService<T> {
    T getById(Long requestId);

    T create(LinkedHashMap request);

    List<T> getAll();

    T update(Integer id, T request);

}
