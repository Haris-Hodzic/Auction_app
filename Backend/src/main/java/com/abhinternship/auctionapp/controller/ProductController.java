package com.abhinternship.auctionapp.controller;

import com.abhinternship.auctionapp.exception.RepositoryException;
import com.abhinternship.auctionapp.model.Product;
import com.abhinternship.auctionapp.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class ProductController extends BaseController<Product> {
    @Autowired
    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        super(productService);
    }

    @GetMapping("/arrivals/{pageNumber}")
    @ResponseBody
    public List<Product> getNewProducts(@PathVariable Long pageNumber) throws RepositoryException {
        return productService.findAllProductByStartDateDesc(pageNumber);
    }

    @GetMapping("/lastchance/{pageNumber}")
    @ResponseBody
    public List<Product> getLastChance(@PathVariable Long pageNumber) throws RepositoryException {
        return productService.findAllProductByEndDateAsc(pageNumber);
    }
}
