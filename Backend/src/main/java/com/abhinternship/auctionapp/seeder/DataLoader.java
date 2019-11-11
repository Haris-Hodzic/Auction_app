package com.abhinternship.auctionapp.seeder;

import com.abhinternship.auctionapp.model.Address;
import com.abhinternship.auctionapp.model.Category;
import com.abhinternship.auctionapp.model.Product;
import com.abhinternship.auctionapp.model.User;
import com.abhinternship.auctionapp.repository.AddressRepository;
import com.abhinternship.auctionapp.repository.ProductRepository;
import com.abhinternship.auctionapp.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@Component
@Order(2)
public class ProductDataLoader implements CommandLineRunner {
    @Autowired
    ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public ProductDataLoader(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        addressRepository.deleteAll();
        userRepository.deleteAll();
        productRepository.deleteAll();

        List<Product> listOfProducts = new ArrayList<>();
        Set<Category> setOfCategories = new HashSet<>();
        List<Address> listOfAddresses = new ArrayList<>();
        Date currentDate = new Date();
        DateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");

        Category category1 = new Category("Shoes");
        Category category2 = new Category("Men");
        setOfCategories.add(category1);
        setOfCategories.add(category2);



        User user= new User("Haris", "Hodzic", "harishodzic@hotmail.com", "male", new Date("07/03/1997"), "062-987-654", bCryptPasswordEncoder.encode("Haris123"));
        userRepository.save(user);
        Set<String> product0 = new HashSet<>();
        Set<String> product1 = new HashSet<>();
        Set<String> product2 = new HashSet<>();
        Set<String> product3 = new HashSet<>();
        Set<String> product4 = new HashSet<>();
        Set<String> product5 = new HashSet<>();
        Set<String> product6 = new HashSet<>();
        Set<String> product7 = new HashSet<>();

        product0.add("/assets/images/product0p0.jpg");
        product0.add("/assets/images/product0p1.jpg");
        product0.add("/assets/images/product0p2.jpg");
        product0.add("/assets/images/product0p3.jpg");
        product1.add("/assets/images/product1p0.jpg");
        product1.add("/assets/images/product1p1.jpg");
        product1.add("/assets/images/product1p2.jpg");
        product1.add("/assets/images/product1p3.jpg");
        product2.add("/assets/images/product2p0.jpg");
        product2.add("/assets/images/product2p1.jpg");
        product2.add("/assets/images/product2p2.jpg");
        product2.add("/assets/images/product2p3.jpg");
        product3.add("/assets/images/product3p0.png");
        product3.add("/assets/images/product3p1.png");
        product3.add("/assets/images/product3p2.png");
        product3.add("/assets/images/product3p3.jpg");
        product4.add("/assets/images/product4p0.jpeg");
        product4.add("/assets/images/product4p1.jpeg");
        product4.add("/assets/images/product4p2.jpeg");
        product4.add("/assets/images/product4p3.jpeg");
        product5.add("/assets/images/product5p0.jpeg");
        product5.add("/assets/images/product5p1.jpeg");
        product5.add("/assets/images/product5p2.jpeg");
        product5.add("/assets/images/product5p3.jpeg");
        product6.add("/assets/images/product6p0.jpg");
        product6.add("/assets/images/product6p1.jpg");
        product6.add("/assets/images/product6p2.jpeg");
        product6.add("/assets/images/product6p3.jpeg");
        product7.add("/assets/images/product7p0.jpg");
        product7.add("/assets/images/product7p1.jpg");
        product7.add("/assets/images/product7p2.jpg");
        product7.add("/assets/images/product7p3.jpg");

        listOfProducts.add(new Product("Tissot Watch T120", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut consequat nulla. Duis nec fermentum erat, et varius augue. Vivamus sed tempor libero. ", 520.00, new Date(), new Date("2019/11/29"), false, "061123456", 520.00));
        listOfProducts.add(new Product("iPhone 11 Pro Max", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut consequat nulla. Duis nec fermentum erat, et varius augue. Vivamus sed tempor libero. ", 2779.00, new Date(), new Date("2019/11/17"), false, "061123456", 2779.00));
        listOfProducts.add(new Product("iPhone XR", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut consequat nulla. Duis nec fermentum erat, et varius augue. Vivamus sed tempor libero. ", 1949.00, new Date(), new Date("2019/11/16"), false, "061123456", 1949.00));
        listOfProducts.add(new Product("MacBook Pro 13″", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut consequat nulla. Duis nec fermentum erat, et varius augue. Vivamus sed tempor libero. ", 3499.00, new Date(), new Date("2019/11/20"), false, "061123456", 3499.00));
        listOfProducts.add(new Product("Nike Air Force 1", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut consequat nulla. Duis nec fermentum erat, et varius augue. Vivamus sed tempor libero. ", 129.95, new Date(), new Date("2019/11/10"), false, "061123456", 129.95));
        listOfProducts.add(new Product("Nike NIKE AIR MAX LTD 3", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut consequat nulla. Duis nec fermentum erat, et varius augue. Vivamus sed tempor libero.", 179.00, new Date("2019/10/28"), new Date("2019/11/22"), false, "061123456", 179.23));
        listOfProducts.add(new Product("Nike M NSW CE TRK", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut consequat nulla. Duis nec fermentum erat, et varius augue. Vivamus sed tempor libero.", 102.99, new Date("2019/09/29"), new Date("2019/11/23"), false, "061123456", 102.99));
        listOfProducts.add(new Product("Nike M J 23ALPHA", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut consequat nulla. Duis nec fermentum erat, et varius augue. Vivamus sed tempor libero.", 145.77, new Date("2019/11/02"), new Date("2019/12/30"), false, "061123456", 145.77));
        listOfProducts.add(new Product("Shoes", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut consequat nulla. Duis nec fermentum erat, et varius augue. Vivamus sed tempor libero.", 110.00, new Date("2019/02/19"), new Date("2019/11/01"), false, "061123456", 110.00));
        listOfProducts.add(new Product("Shoes", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut consequat nulla. Duis nec fermentum erat, et varius augue. Vivamus sed tempor libero.", 110.00, new Date(), new Date("2019/11/29"), false, "061123456", 110.00));
        listOfProducts.add(new Product("Shoes", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut consequat nulla. Duis nec fermentum erat, et varius augue. Vivamus sed tempor libero.", 110.00, new Date(), new Date("2019/11/29"), false, "061123456", 110.00));
        listOfProducts.add(new Product("Shoes", "sport shoes", 110.00, new Date(), new Date("2019/12/23"), false, "061123456", 110.00));
        listOfProducts.add(new Product("Shoes", "sport shoes", 110.00, new Date(), new Date("2019/12/01"), false, "061123456", 110.00));
        listOfProducts.add(new Product("Shoes", "sport shoes", 110.00, new Date(), new Date("2019/12/05"), false, "061123456", 110.00));
        listOfProducts.add(new Product("Shoes", "sport shoes", 110.00, new Date(), new Date("2019/12/29"), false, "061123456", 110.00));
        listOfProducts.add(new Product("Shoes", "sport shoes", 110.00, new Date(), new Date("2019/12/21"), false, "061123456", 110.00));
        listOfProducts.get(0).setCategories(setOfCategories);
        listOfProducts.get(0).setUser(user);
        listOfProducts.get(0).setPhoto(product0);
        listOfProducts.get(1).setPhoto(product1);
        listOfProducts.get(2).setPhoto(product2);
        listOfProducts.get(3).setPhoto(product3);
        listOfProducts.get(4).setPhoto(product4);
        listOfProducts.get(5).setPhoto(product5);
        listOfProducts.get(6).setPhoto(product6);
        listOfProducts.get(7).setPhoto(product7);
        listOfProducts.get(8).setPhoto(product0);
        listOfProducts.get(9).setPhoto(product1);
        listOfProducts.get(10).setPhoto(product2);
        listOfProducts.get(11).setPhoto(product3);
        listOfProducts.get(12).setPhoto(product4);
        listOfProducts.get(13).setPhoto(product5);
        listOfProducts.get(14).setPhoto(product6);
        listOfProducts.get(15).setPhoto(product7);
        productRepository.saveAll(listOfProducts);
    }
}
