package com.abhinternship.auctionapp.service;

import com.abhinternship.auctionapp.model.User;
import com.abhinternship.auctionapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class TestService {
    @Autowired
    UserRepository userRepository;

    public List<User> findAllUsers(){
        List<User> lista= new ArrayList<>();

        lista = userRepository.findAll();
        return lista;
    }
    public Optional<User> findbyname(){
        List<User> lista= new ArrayList<>();
        Long id = new Long(1);
        return userRepository.findById(id);
    }

}
