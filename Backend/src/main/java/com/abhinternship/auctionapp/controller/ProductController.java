package com.abhinternship.auctionapp.controller;

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

    @RequestMapping(value = "/arrivals/{pageNumber}", method = RequestMethod.GET)
    @ResponseBody
    public List<Product> getNewProducts(@PathVariable Long pageNumber) {
        return productService.findAllProductByStartDateDesc(pageNumber);
    }

    @RequestMapping(value = "/lastchance/{pageNumber}", method = RequestMethod.GET)
    @ResponseBody
    public List<Product> getLastChance(@PathVariable Long pageNumber) {
        return productService.findAllProductByEndDateAsc(pageNumber);
    }
}
