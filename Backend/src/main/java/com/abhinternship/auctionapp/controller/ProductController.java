package com.abhinternship.auctionapp.controller;

import com.abhinternship.auctionapp.exception.RepositoryException;
import com.abhinternship.auctionapp.model.*;
import com.abhinternship.auctionapp.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
    public List<Product> getAllActiveProductsByUser(@RequestParam(value = "user") User user, @RequestParam(value = "pageSize") Long pageSize) throws RepositoryException {
        return productService.getAllActiveProductsByUser(user, pageSize);
    }
    @GetMapping("/sold")
    public List<Product> getAllSoldProductsByUser(@RequestParam(value = "user") User user, @RequestParam(value = "pageSize") Long pageSize) throws RepositoryException {
        return productService.getAllSoldProductsByUser(user, pageSize);
    }
}