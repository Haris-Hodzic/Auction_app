package com.abhinternship.auctionapp.controller;

import com.abhinternship.auctionapp.exception.RepositoryException;
import com.abhinternship.auctionapp.service.BaseService;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.transaction.Transactional;
import javax.validation.Valid;
import java.io.IOException;
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
    public boolean create(@RequestBody @Valid LinkedHashMap request, BindingResult errors) throws RepositoryException, IOException {
        return implementedService.create(request);
    }

    @GetMapping("/{requestId}")
    @ResponseBody
    public T get(@PathVariable Long requestId) throws RepositoryException {
        return implementedService.getById(requestId);
    }

    @PutMapping("/{requestId}")
    @ResponseBody
    @CrossOrigin
    public T modify(@PathVariable Long requestId, @RequestBody @Valid final LinkedHashMap request) throws RepositoryException{
        return implementedService.update(requestId, request);
    }

    @DeleteMapping
    @ResponseBody
    @Transactional
    @CrossOrigin
    public void delete(@RequestParam(value = "id") Long id) throws RepositoryException{
        implementedService.delete(id);
    }
}
