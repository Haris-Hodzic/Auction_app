package com.abhinternship.auctionapp.seeder;

import com.abhinternship.auctionapp.model.Address;
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

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
@Order(1)
public class UserDataLoader implements CommandLineRunner {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Override
    public void run(String... args) throws Exception {
        addressRepository.deleteAll();
        userRepository.deleteAll();

        List<Address> listOfAddresses = new ArrayList<>();
        listOfAddresses.add(new Address("3432  Dog Hill Lane", "KINGDOM CITY", "Missouri", "US", "65262"));
        listOfAddresses.add(new Address("1620  Clearview Drive", "Denver", "Colorado", "US", "80202"));
        listOfAddresses.add(new Address("51  Arbutus Drive", "MAYSLICK", "Kentucky", "US", "41055"));
        listOfAddresses.add(new Address("4089  Archwood Avenue", "Riverton", "Wyoming", "US", "82501"));
        addressRepository.saveAll(listOfAddresses);

        List<User> listOfUsers = new ArrayList<>();
        listOfUsers.add(new User("Haris", "Hodzic", "haris@hotmail.com", "male", new Date("07/03/1997"), "062-987-654", bCryptPasswordEncoder.encode("Haris123")));
        listOfUsers.add(new User("Edis", "Hodzic", "edis@hotmail.com", "male", new Date("04/12/1987"), "062-123-456", bCryptPasswordEncoder.encode("Edis123")));
        listOfUsers.add(new User("Todd", "Hutchins", "bu3q95kp5ct@powerencry.com", "male", new Date("6/19/1998"), "307-240-4091", bCryptPasswordEncoder.encode("Haris123")));
        listOfUsers.add(new User("Karen", "Wallace", "cemg3km2fyj@classesmail.com", "female", new Date("12/2/1957"), "214-205-7905", bCryptPasswordEncoder.encode("Haris123")));
        listOfUsers.get(0).setAddress(listOfAddresses.get(0));
        listOfUsers.get(1).setAddress(listOfAddresses.get(1));
        listOfUsers.get(2).setAddress(listOfAddresses.get(2));
        listOfUsers.get(3).setAddress(listOfAddresses.get(3));
        userRepository.saveAll(listOfUsers);
    }
}
