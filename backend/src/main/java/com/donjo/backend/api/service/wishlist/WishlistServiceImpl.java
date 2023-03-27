package com.donjo.backend.api.service.wishlist;

import com.donjo.backend.api.dto.wishlist.request.AddWishlistCond;
import com.donjo.backend.api.dto.wishlist.request.UpdateWishlistCond;
import com.donjo.backend.api.dto.wishlist.response.GetWishlistsPayload;
import com.donjo.backend.exception.NoContentException;
import com.donjo.backend.solidity.wishlist.WishlistSol;
import com.donjo.backend.solidity.wishlist.WishlistSolidity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService{

    private final WishlistSolidity wishlistSolidity;

    @Override
    public GetWishlistsPayload getAllWishlist(String address, int pageNum, int pageSize) {
        // null 체크
        List<WishlistSol> list = wishlistSolidity.getMemberWishLists(address).orElseThrow(()-> new NoContentException());

        // 정렬
        Collections.reverse(list);

        // 페이지네이션
        int startIdx = pageNum * pageSize;
        int endIdx = (pageNum + 1) * pageSize - 1;
        if(list.size() == 0 || list.size() <= startIdx) {
            throw new NoContentException();
        }
        List<WishlistSol> result = new ArrayList<>();
        for (int i = startIdx; i < list.size(); i++) {
            if(i > endIdx) break;
            result.add(list.get(i));
        }

        return GetWishlistsPayload.from(list.size(), pageNum, pageSize, result);
    }

    @Override
    public Optional<WishlistSol> getOneWishlist(Long uid) {
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
