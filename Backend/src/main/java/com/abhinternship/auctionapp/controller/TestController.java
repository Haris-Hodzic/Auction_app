package com.abhinternship.auctionapp.controller;

import com.abhinternship.auctionapp.model.User;
import com.abhinternship.auctionapp.service.TestService;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TestController {

    @Autowired
    TestService testService;

    @GetMapping("/authentication/test")
    public List<User> index(){
        return testService.findAllUsers();
    }

    @PostMapping("/api")
    public User createTrap(@RequestBody User user){

        System.out.println(user);
        return user;
    }


}
