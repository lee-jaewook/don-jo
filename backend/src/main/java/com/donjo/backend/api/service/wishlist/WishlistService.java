package com.donjo.backend.api.service.wishlist;

import com.donjo.backend.api.dto.wishlist.request.AddWishlistCond;
import com.donjo.backend.api.dto.wishlist.request.UpdateWishlistCond;
import com.donjo.backend.api.dto.wishlist.response.GetWishlistsPayload;
import com.donjo.backend.api.dto.wishlist.response.WishlistDetailPayload;
import com.donjo.backend.solidity.wishlist.WishlistSol;

import java.util.List;
import java.util.Optional;

public interface WishlistService {
    // Address로 Wishlist 조회(Pagination)
    GetWishlistsPayload getAllWishlist(String address, int pageNum, int pageSize);
    // Uid로 특정 Wishlist 가져오기
    WishlistDetailPayload getOneWishlist(Long uid);
    // memberAddress와 cond를 입력 받아 Wishlist 추가
    void addWishlist(String memberAddress, AddWishlistCond cond);
    // memberAddress와 Uid로 특정 Wishlist 삭제
    void deleteWishlist(String memberAddress, Long uid);
    // memberAddress와 cond를 입력 받아 Wishlist Update
    void updateWishlist(String memberAddress, UpdateWishlistCond cond);
}
