package com.abhinternship.auctionapp.seeder;

import com.abhinternship.auctionapp.model.Category;
import com.abhinternship.auctionapp.model.Product;
import com.abhinternship.auctionapp.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@Order(2)
public class ProductDataLoader implements CommandLineRunner {
    @Autowired
    ProductRepository productRepository;

    public ProductDataLoader(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        List<Product> listOfProducts = new ArrayList<>();
        Set<Category> setOfCategories = new HashSet<>();

        Category category1 = new Category("Shoes");
        Category category2 = new Category("Men");
        setOfCategories.add(category1);
        setOfCategories.add(category2);

        productRepository.deleteAll();
        listOfProducts.add(new Product("Shoes", "sport shoes", 110.00, new Date("02/11/2019"), new Date("10/11/2019"), false, "061123456", 110.00));
        listOfProducts.add(new Product("Shoes", "sport shoes", 110.00, new Date("02/11/2019"), new Date("10/11/2019"), false, "061123456", 110.00));
        listOfProducts.add(new Product("Shoes", "sport shoes", 110.00, new Date("02/11/2019"), new Date("10/11/2019"), false, "061123456", 110.00));
        listOfProducts.add(new Product("Shoes", "sport shoes", 110.00, new Date("02/11/2019"), new Date("10/11/2019"), false, "061123456", 110.00));
        listOfProducts.get(0).setCategories(setOfCategories);
        productRepository.saveAll(listOfProducts);
    }
}
