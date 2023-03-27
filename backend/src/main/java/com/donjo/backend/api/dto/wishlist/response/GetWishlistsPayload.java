package com.donjo.backend.api.dto.wishlist.response;

import com.donjo.backend.solidity.Item.ItemSol;
import com.donjo.backend.solidity.wishlist.WishlistSol;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetWishlistsPayload {
    int size;
    int pageNum;
    int pageSize;
    List<WishlistSol> wishlists;

    public static GetWishlistsPayload from(int size, int pageNum, int pageSize, List<WishlistSol> itemList){
        return GetWishlistsPayload.builder()
                .size(size)
                .pageNum(pageNum)
                .pageSize(pageSize)
                .wishlists(itemList)
                .build();
    }
}
