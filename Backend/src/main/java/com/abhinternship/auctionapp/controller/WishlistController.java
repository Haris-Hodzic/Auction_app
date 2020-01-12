package com.abhinternship.auctionapp.controller;

import com.abhinternship.auctionapp.exception.RepositoryException;
import com.abhinternship.auctionapp.model.Wishlist;
import com.abhinternship.auctionapp.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

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
    public Page<Wishlist> getByUser(@RequestParam(value = "userId") Long userId, @RequestParam(value = "pageNumber") Long pageNumber) throws RepositoryException {
        return wishlistService.getAllByUser(userId, pageNumber);
    }

    @PostMapping("/exist")
    public Boolean existInWishlist(@RequestParam(value = "productId") Long productId) {
        return wishlistService.existInWishlist(productId);
    }
}