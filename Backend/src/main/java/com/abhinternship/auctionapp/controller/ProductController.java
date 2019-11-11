package com.abhinternship.auctionapp.controller;

import com.abhinternship.auctionapp.model.Product;
import com.abhinternship.auctionapp.service.BaseService;
import com.abhinternship.auctionapp.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value ="/api")
public class ProductController  extends BaseController{
    @Autowired
    private ProductService implementedService;
    @Override
    protected BaseService baseService() {
        return implementedService;
    }
    @PostMapping("/arrivals")
    @ResponseBody
    public List<Product> getNewProducts(@RequestBody int size) {
        return implementedService.findAllProductByStartDateDesc(size);
    }
    @PostMapping ("/lastchance")
    @ResponseBody
    public List<Product> getLastChance(@RequestBody int size) {
        return implementedService.findAllProductByEndDateAsc(size);
    }
}
