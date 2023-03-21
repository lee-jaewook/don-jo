package com.donjo.backend.api.service.wishlist;

import com.donjo.backend.api.dto.wishlist.request.AddWishlistCond;
import com.donjo.backend.api.dto.wishlist.request.UpdateWishlistCond;
import com.donjo.backend.exception.NoContentException;
import com.donjo.backend.solidity.wishlist.Wishlist;
import com.donjo.backend.solidity.wishlist.WishlistSolidity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService{

    private final WishlistSolidity wishlistSolidity;

    @Override
    public List<Wishlist> getAllWishlist(String address) {
        List<Wishlist> list = wishlistSolidity.getMemberWishLists(address).orElseThrow(()-> new NoContentException());
        if(list.size() == 0) throw new NoContentException();
        Collections.reverse(list);
        return list;
    }

    @Override
    public Optional<Wishlist> getOneWishlist(Long uid) {
        return wishlistSolidity.getMemberWishListDetail(uid);
    }

    @Override
    public void addWishlist(String memberAddress, AddWishlistCond cond) {
        wishlistSolidity.addMemberWishList(cond.toWishlist(memberAddress));
    }

    @Override
    public void deleteWishlist(String memberAddress, Long uid) {
        wishlistSolidity.deleteMemberWishlist(memberAddress, uid);
    }

    @Override
    public void updateWishlist(String memberAddress, UpdateWishlistCond cond) {
        wishlistSolidity.updateMemberWishlist(cond.toWishlist(memberAddress));
    }
}
