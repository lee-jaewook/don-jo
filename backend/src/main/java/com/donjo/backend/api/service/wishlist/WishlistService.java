package com.donjo.backend.api.service.wishlist;

import com.donjo.backend.api.dto.wishlist.request.AddWishlistCond;
import com.donjo.backend.api.dto.wishlist.request.UpdateWishlistCond;
import com.donjo.backend.solidity.wishlist.Wishlist;

import java.util.List;
import java.util.Optional;

public interface WishlistService {
    List<Wishlist> getAllWishlist(String address, int pageNum, int pageSize);
    Optional<Wishlist> getOneWishlist(Long uid);
    void addWishlist(String memberAddress, AddWishlistCond cond);
    void deleteWishlist(String memberAddress, Long uid);
    void updateWishlist(String memberAddress, UpdateWishlistCond cond);
}
