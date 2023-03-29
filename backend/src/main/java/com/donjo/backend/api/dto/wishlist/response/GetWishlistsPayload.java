package com.donjo.backend.api.dto.wishlist.response;

import com.donjo.backend.api.dto.item.response.ItemDetailPayload;
import com.donjo.backend.solidity.Item.ItemSol;
import com.donjo.backend.solidity.wishlist.WishlistSol;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetWishlistsPayload {
    int size;
    int pageNum;
    int pageSize;
    boolean hasMore;
    List<WishlistDetailPayload> wishlists;

    public static GetWishlistsPayload from(int size, int pageNum, int pageSize, List<WishlistSol> wishlists){
        return GetWishlistsPayload.builder()
                .size(size)
                .pageNum(pageNum)
                .pageSize(pageSize)
                .hasMore(size > (pageNum + 1) * pageSize)
                .wishlists(wishlists.stream().map(wishlist -> WishlistDetailPayload.from(wishlist)).collect(Collectors.toList()))
                .build();
    }
}
