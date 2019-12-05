package com.abhinternship.auctionapp.controller;

import com.abhinternship.auctionapp.exception.RepositoryException;
import com.abhinternship.auctionapp.model.*;
import com.abhinternship.auctionapp.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
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

    @GetMapping("/filter")
    public Page<Product> getFilteredProducts(@RequestParam(value = "category", required = false) String category,
                                             @RequestParam(value = "subcategory", required = false) String subcategory,
                                             @RequestParam(value = "searchString", required = false) String searchString,
                                             @RequestParam(value = "startPrice", required = false) String startPrice,
                                             @RequestParam(value = "endPrice", required = false) String endPrice,
                                             @RequestParam(value = "color", required = false) String color,
                                             @RequestParam(value = "size", required = false) String size,
                                             @RequestParam(value = "pageSize", required = false) Long pageSize,
                                             @RequestParam(value = "sortingType", required = false) String sortingType,
                                             @RequestParam(value = "order", required = false) String order) throws RepositoryException {
        return productService.getFilteredProducts(category, subcategory, searchString, startPrice, endPrice, color, size, pageSize, sortingType, order);
    }

    @GetMapping("/filter/color")
    public List<ColorDto> getProductsColor() throws RepositoryException {
        return productService.getProductsColor();
    }

    @GetMapping("/filter/size")
    public List<SizeDto> getProductsSize() throws RepositoryException {
        return productService.getProductsSize();
    }

    @GetMapping("/subcategories")
    public List<SubcategoryDto> getAllDistinctCategories(@RequestParam(value = "category") String category) {
        return productService.getDistinctSubcategories(category);
    }

    @GetMapping("/price")
    public List<Double> getAllPrices() {
        return productService.getAllPrices();
    }

    @GetMapping("/active")
    public List<Product> getAllActiveProductsByUserId(@RequestParam(value = "userId") Long userId, @RequestParam(value = "pageNumber") Long pageNumber) throws RepositoryException {
        return productService.getAllActiveProductsByUserId(userId, pageNumber);
    }
    @GetMapping("/sold")
    public List<Product> getAllSoldProductsByUserId(@RequestParam(value = "userId") Long userId, @RequestParam(value = "pageNumber") Long pageNumber) throws RepositoryException {
        return productService.getAllSoldProductsByUserId(userId, pageNumber);
    }

    @MessageMapping("/notification")
    @SendTo("/topic/notifications")
    public Notification getNotification(Notification message) throws Exception {
        return message;
    }
}
