package com.abhinternship.auctionapp.controller;

import com.abhinternship.auctionapp.exception.RepositoryException;
import com.abhinternship.auctionapp.model.Category;
import com.abhinternship.auctionapp.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/category")
public class CategoryController extends BaseController<Category> {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        super(categoryService);
    }

    @GetMapping("/get")
    public Category getCategoryByName(@RequestParam(value = "categoryName") String categoryName) throws RepositoryException {
        return categoryService.getCategoryByName(categoryName);
    }
}
