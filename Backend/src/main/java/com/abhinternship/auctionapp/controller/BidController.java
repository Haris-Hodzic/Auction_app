package com.abhinternship.auctionapp.controller;

import com.abhinternship.auctionapp.exception.RepositoryException;
import com.abhinternship.auctionapp.model.Bid;
import com.abhinternship.auctionapp.service.BidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(value = "/api/bid")
public class BidController extends BaseController<Bid> {
    @Autowired
    private BidService bidService;

    @Autowired
    public BidController(BidService bidService) {
        super(bidService);
    }

    @GetMapping("/product/{productId}")
    @ResponseBody
    public List<Bid> getBidsByProductId(@PathVariable Long productId) throws RepositoryException {
        return bidService.getAllByProductId(productId);
    }
}
