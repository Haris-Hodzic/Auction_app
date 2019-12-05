package com.abhinternship.auctionapp.controller;

import com.abhinternship.auctionapp.exception.RepositoryException;
import com.abhinternship.auctionapp.model.User;
import com.abhinternship.auctionapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/authentication")
public class UserController extends BaseController<User> {
    @Autowired
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        super(userService);
    }

    @PostMapping("/emailAvailable")
    public Boolean checkEmail(@RequestBody String email) {
        return userService.checkEmail(email);
    }

    @GetMapping("/user")
    public User getUserByEmail(@RequestParam(value = "email") String email) throws RepositoryException  {
        return userService.getUserByEmail(email);
    }
}
