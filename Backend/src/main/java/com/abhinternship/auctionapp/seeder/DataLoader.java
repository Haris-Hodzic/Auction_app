package com.abhinternship.auctionapp.seeder;

import com.abhinternship.auctionapp.model.Address;
import com.abhinternship.auctionapp.model.Category;
import com.abhinternship.auctionapp.model.Product;
import com.abhinternship.auctionapp.model.User;
import com.abhinternship.auctionapp.repository.AddressRepository;
import com.abhinternship.auctionapp.repository.ProductRepository;
import com.abhinternship.auctionapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import java.util.*;

@Component
@Order(1)
public class DataLoader implements CommandLineRunner {
    @Autowired
    ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public DataLoader(ProductRepository productRepository) {
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
        List<User> listOfUsers = new ArrayList<>();

        Category category1 = new Category("Shoes");
        Category category2 = new Category("Men");
        setOfCategories.add(category1);
        setOfCategories.add(category2);

        listOfAddresses.add(new Address("3432  Dog Hill Lane", "KINGDOM CITY", "Missouri", "US", "65262"));
        listOfAddresses.add(new Address("1620  Clearview Drive", "Denver", "Colorado", "US", "80202"));
        listOfAddresses.add(new Address("51  Arbutus Drive", "MAYSLICK", "Kentucky", "US", "41055"));
        listOfAddresses.add(new Address("4089  Archwood Avenue", "Riverton", "Wyoming", "US", "82501"));
        addressRepository.saveAll(listOfAddresses);

        listOfUsers.add(new User("Haris", "Hodzic", "haris@hotmail.com", "male", new Date("07/03/1997"), "062-987-654", bCryptPasswordEncoder.encode("Haris123"), "/assets/images/profile1.jpg"));
        listOfUsers.add(new User("Edis", "Hodzic", "edis@hotmail.com", "male", new Date("04/12/1987"), "062-123-456", bCryptPasswordEncoder.encode("Edis123"), "/assets/images/profile2.jpg"));
        listOfUsers.add(new User("Todd", "Hutchins", "bu3q95kp5ct@powerencry.com", "male", new Date("6/19/1998"), "307-240-4091", bCryptPasswordEncoder.encode("Haris123"), "/assets/images/profile3.png"));
        listOfUsers.add(new User("Karen", "Wallace", "cemg3km2fyj@classesmail.com", "female", new Date("12/2/1957"), "214-205-7905", bCryptPasswordEncoder.encode("Haris123"), "/assets/images/profile4.jpg"));
        listOfUsers.get(0).setAddress(listOfAddresses.get(0));
        listOfUsers.get(1).setAddress(listOfAddresses.get(1));
        listOfUsers.get(2).setAddress(listOfAddresses.get(2));
        listOfUsers.get(3).setAddress(listOfAddresses.get(3));
        userRepository.saveAll(listOfUsers);

        Set<String> product0 = new HashSet<>();
        Set<String> product1 = new HashSet<>();
        Set<String> product2 = new HashSet<>();
        Set<String> product3 = new HashSet<>();
        Set<String> product4 = new HashSet<>();
        Set<String> product5 = new HashSet<>();
        Set<String> product6 = new HashSet<>();
        Set<String> product7 = new HashSet<>();

        product0.add("https://www.univerzalno.com/wp-content/uploads/2019/10/iPhone11ProMAX8.jpg");
        product0.add("https://www.univerzalno.com/wp-content/uploads/2019/10/iPhone11ProMAX7.jpg");
        product0.add("https://www.univerzalno.com/wp-content/uploads/2019/10/iPhone11ProMAX9.jpg");
        product0.add("https://www.univerzalno.com/wp-content/uploads/2019/10/iPhone11ProMAX12.jpg");
        product1.add("https://www.univerzalno.com/wp-content/uploads/2019/06/apple_iphone_x_64gb10.jpg");
        product1.add("https://www.univerzalno.com/wp-content/uploads/2019/06/apple_iphone_x_64gb3.jpg");
        product1.add("https://www.univerzalno.com/wp-content/uploads/2019/06/apple_iphone_x_64gb4.jpg");
        product1.add("https://www.univerzalno.com/wp-content/uploads/2019/06/apple_iphone_x_64gb5.jpg");
        product2.add("https://www.univerzalno.com/wp-content/uploads/2019/02/apple_iphone_xr_128gb_30907883201-1.jpg");
        product2.add("https://www.univerzalno.com/wp-content/uploads/2019/02/apple_iphone_xr_128gb_30907883202-1.jpg");
        product2.add("https://www.univerzalno.com/wp-content/uploads/2019/02/apple_iphone_xr_128gb_30907883203-1.jpg");
        product2.add("https://www.univerzalno.com/wp-content/uploads/2019/02/apple_iphone_xr_128gb_30907883204-1.jpg");
        product3.add("https://www.univerzalno.com/wp-content/uploads/2019/06/m304.jpg");
        product3.add("https://www.univerzalno.com/wp-content/uploads/2019/06/m305.jpg");
        product3.add("https://www.univerzalno.com/wp-content/uploads/2019/06/m302.jpg");
        product3.add("https://www.univerzalno.com/wp-content/uploads/2019/06/m309.jpg");
        product4.add("https://www.univerzalno.com/wp-content/uploads/2019/10/5-1.png");
        product4.add("https://www.univerzalno.com/wp-content/uploads/2019/10/5-2.png");
        product4.add("https://www.univerzalno.com/wp-content/uploads/2019/10/5-3.png");
        product4.add("https://www.univerzalno.com/wp-content/uploads/2019/10/5-4.png");
        product5.add("https://www.univerzalno.com/wp-content/uploads/2019/08/25.png");
        product5.add("https://www.univerzalno.com/wp-content/uploads/2019/08/26.png");
        product5.add("https://www.univerzalno.com/wp-content/uploads/2019/08/27.png");
        product5.add("https://www.univerzalno.com/wp-content/uploads/2019/08/25.png");
        product6.add("https://d1rkccsb0jf1bk.cloudfront.net/products/99998437/main/large/t106_417_11_051_00-1460379836-2948.jpg");
        product6.add("https://d1rkccsb0jf1bk.cloudfront.net/products/99998437/additional/large/99998437-2.jpg");
        product6.add("https://d1rkccsb0jf1bk.cloudfront.net/products/99998437/additional/large/99998437-1.jpg");
        product6.add("https://d1rkccsb0jf1bk.cloudfront.net/products/99998437/main/large/t106_417_11_051_00-1460379836-2948.jpg");
        product7.add("https://d1rkccsb0jf1bk.cloudfront.net/products/99941071/main/large/AT4004-52E.jpg");
        product7.add("https://d1rkccsb0jf1bk.cloudfront.net/products/99941071/additional/large/at4004-52e-2-1429875709-6855.jpg");
        product7.add("https://d1rkccsb0jf1bk.cloudfront.net/products/99941071/additional/large/at4004-52e-4-1429875716-4687.jpg");
        product7.add("https://d1rkccsb0jf1bk.cloudfront.net/products/99941071/additional/large/at4004-52e-1-1429875722-3364.jpg");

        listOfProducts.add(new Product("iPhone 11 Pro Max", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut consequat nulla. Duis nec fermentum erat, et varius augue. Vivamus sed tempor libero. ", 520.00, new Date(), new Date("2019/11/29"), false, "061123456", 520.00, listOfUsers.get(0)));
        listOfProducts.add(new Product("Apple iPhone X 64GB", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut consequat nulla. Duis nec fermentum erat, et varius augue. Vivamus sed tempor libero. ", 2779.00, new Date(), new Date("2019/11/17"), false, "061123456", 2779.00, listOfUsers.get(1)));
        listOfProducts.add(new Product("iPhone XR", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut consequat nulla. Duis nec fermentum erat, et varius augue. Vivamus sed tempor libero. ", 1949.00, new Date(), new Date("2019/11/16"), false, "061123456", 1949.00, listOfUsers.get(2)));
        listOfProducts.add(new Product("Samsung Galaxy M30″", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut consequat nulla. Duis nec fermentum erat, et varius augue. Vivamus sed tempor libero. ", 3499.00, new Date(), new Date("2019/11/20"), false, "061123456", 3499.00, listOfUsers.get(3)));
        listOfProducts.add(new Product("HP 2324", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut consequat nulla. Duis nec fermentum erat, et varius augue. Vivamus sed tempor libero. ", 129.95, new Date(), new Date("2019/11/10"), false, "061123456", 129.95, listOfUsers.get(0)));
        listOfProducts.add(new Product("MacBook Pro 13” ", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut consequat nulla. Duis nec fermentum erat, et varius augue. Vivamus sed tempor libero.", 179.00, new Date("2019/10/28"), new Date("2019/11/22"), false, "061123456", 179.23, listOfUsers.get(1)));
        listOfProducts.add(new Product("Mens Tissot V8", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut consequat nulla. Duis nec fermentum erat, et varius augue. Vivamus sed tempor libero.", 102.99, new Date("2019/09/29"), new Date("2019/11/23"), false, "061123456", 102.99, listOfUsers.get(2)));
        listOfProducts.add(new Product("Nike M J 23ALPHA", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut consequat nulla. Duis nec fermentum erat, et varius augue. Vivamus sed tempor libero.", 145.77, new Date("2019/11/02"), new Date("2019/12/30"), false, "061123456", 145.77, listOfUsers.get(3)));
        listOfProducts.add(new Product("Shoes", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut consequat nulla. Duis nec fermentum erat, et varius augue. Vivamus sed tempor libero.", 110.00, new Date("2019/02/19"), new Date("2019/11/01"), false, "061123456", 110.00, listOfUsers.get(0)));
        listOfProducts.add(new Product("Shoes", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut consequat nulla. Duis nec fermentum erat, et varius augue. Vivamus sed tempor libero.", 110.00, new Date(), new Date("2019/11/29"), false, "061123456", 110.00, listOfUsers.get(1)));
        listOfProducts.add(new Product("Shoes", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut consequat nulla. Duis nec fermentum erat, et varius augue. Vivamus sed tempor libero.", 110.00, new Date(), new Date("2019/11/29"), false, "061123456", 110.00, listOfUsers.get(2)));
        listOfProducts.add(new Product("Shoes", "sport shoes", 110.00, new Date(), new Date("2019/12/23"), false, "061123456", 110.00, listOfUsers.get(3)));
        listOfProducts.add(new Product("Shoes", "sport shoes", 110.00, new Date(), new Date("2019/12/01"), false, "061123456", 110.00, listOfUsers.get(0)));
        listOfProducts.add(new Product("Shoes", "sport shoes", 110.00, new Date(), new Date("2019/12/05"), false, "061123456", 110.00, listOfUsers.get(1)));
        listOfProducts.add(new Product("Shoes", "sport shoes", 110.00, new Date(), new Date("2019/12/29"), false, "061123456", 110.00, listOfUsers.get(2)));
        listOfProducts.add(new Product("Shoes", "sport shoes", 110.00, new Date(), new Date("2019/12/21"), false, "061123456", 110.00, listOfUsers.get(3)));
        listOfProducts.add(new Product("iPhone 11 Pro Max", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut consequat nulla. Duis nec fermentum erat, et varius augue. Vivamus sed tempor libero. ", 520.00, new Date(), new Date("2019/11/29"), false, "061123456", 520.00, listOfUsers.get(0)));
        listOfProducts.get(0).setCategories(setOfCategories);

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
        listOfProducts.get(16).setPhoto(product7);
        productRepository.saveAll(listOfProducts);
    }
}
