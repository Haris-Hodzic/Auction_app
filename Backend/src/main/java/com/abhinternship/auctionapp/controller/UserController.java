package com.abhinternship.auctionapp.controller;

import com.abhinternship.auctionapp.model.User;
import com.abhinternship.auctionapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value ="/authentication")
public class UserController extends BaseController {
    @Autowired
    private UserService implementedService;

    @PostMapping("/emailAvailable")
    public User checkEmail(@RequestBody String email) {
        return implementedService.checkEmail(email);
    }

    @Override
    protected UserService baseService() {
        return implementedService;
    }
}
