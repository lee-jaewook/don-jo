package com.donjo.backend.api.service.wishlist;

import com.donjo.backend.api.dto.wishlist.request.AddWishlistCond;
import com.donjo.backend.api.dto.wishlist.request.UpdateWishlistCond;
import com.donjo.backend.api.dto.wishlist.response.GetWishlistsPayload;
import com.donjo.backend.solidity.wishlist.WishlistSol;

import java.util.List;
import java.util.Optional;

public interface WishlistService {
    GetWishlistsPayload getAllWishlist(String address, int pageNum, int pageSize);
    Optional<WishlistSol> getOneWishlist(Long uid);
    void addWishlist(String memberAddress, AddWishlistCond cond);
    void deleteWishlist(String memberAddress, Long uid);
    void updateWishlist(String memberAddress, UpdateWishlistCond cond);
}
