package com.abhinternship.auctionapp.controller;

import com.abhinternship.auctionapp.service.BaseService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.LinkedHashMap;
import java.util.List;

abstract public class BaseController<T> {

    protected abstract BaseService<T> baseService();

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public List<T> getAll() {
        return baseService().getAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public T create(@RequestBody @Valid LinkedHashMap request, BindingResult errors) {
        return baseService().create(request);
    }

    @RequestMapping(value = "/{requestId}", method = RequestMethod.GET)
    @ResponseBody
    public T get(@PathVariable Long requestId) {
        return baseService().getById(requestId);
    }

    @RequestMapping(value = "/{requestId}", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<?> modify(@PathVariable Integer requestId, @RequestBody @Valid final T request, final BindingResult errors) {
        return ResponseEntity.ok(baseService().update(requestId, request));
    }
}
