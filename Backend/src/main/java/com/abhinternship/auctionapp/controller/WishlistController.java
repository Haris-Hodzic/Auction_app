package com.abhinternship.auctionapp.controller;

import com.abhinternship.auctionapp.exception.RepositoryException;
import com.abhinternship.auctionapp.model.Product;
import com.abhinternship.auctionapp.model.User;
import com.abhinternship.auctionapp.model.Wishlist;
import com.abhinternship.auctionapp.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/wishlist")
public class WishlistController extends BaseController<Wishlist> {
    @Autowired
    private WishlistService wishlistService;

    @Autowired
    public WishlistController(WishlistService wishlistService) {
        super(wishlistService);
    }

    @GetMapping("/user")
    public List<Wishlist> getByUser(@RequestParam(value = "user") User user, @RequestParam(value = "pageSize") Long pageSize) throws RepositoryException {
        return wishlistService.getAllByUser(user, pageSize);
    }

    @PostMapping("/exist")
    public Boolean existInWishlist(@RequestBody Product product) {
        return wishlistService.existInWishlist(product);
    }
}
