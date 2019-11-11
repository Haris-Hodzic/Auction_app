package com.abhinternship.auctionapp.controller;

import com.abhinternship.auctionapp.exception.RepositoryException;
import com.abhinternship.auctionapp.service.BaseService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.LinkedHashMap;
import java.util.List;

abstract public class BaseController<T> {

    private final BaseService<T> implementedService;

    public BaseController(BaseService<T> baseService) {
        this.implementedService = baseService;
    }

    @GetMapping
    @ResponseBody
    public List<T> getAll() throws RepositoryException {
        return implementedService.getAll();
    }

    @PostMapping
    @ResponseBody
    public boolean create(@RequestBody @Valid LinkedHashMap request, BindingResult errors) throws RepositoryException{
        return implementedService.create(request);
    }

    @GetMapping("/{requestId}")
    @ResponseBody
    public T get(@PathVariable Long requestId) throws RepositoryException {
        return implementedService.getById(requestId);
    }

    @PutMapping("/{requestId}")
    @ResponseBody
    public ResponseEntity<?> modify(@PathVariable Integer requestId, @RequestBody @Valid final T request, final BindingResult errors) throws RepositoryException{
        return ResponseEntity.ok(implementedService.update(requestId, request));
    }
}