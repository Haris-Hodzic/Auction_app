package com.abhinternship.auctionapp.controller;

import com.abhinternship.auctionapp.model.Greeting;
import com.abhinternship.auctionapp.model.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class GreetingController {

    @Autowired
    private SimpMessagingTemplate template;


    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Notification greeting(Notification message) throws Exception {
        Thread.sleep(1000); // simulated delay
        return message;
    }

}