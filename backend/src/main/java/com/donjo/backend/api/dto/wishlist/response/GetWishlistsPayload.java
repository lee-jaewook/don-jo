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
    // 배열 사이즈
    int size;
    // 현재 페이지
    int pageNum;
    // 페이지에 들어갈 위시리스트 숫자
    int pageSize;
    // 다음 페이지 여부
    boolean hasMore;
    List<WishlistDetailPayload> wishlists;
    // DTO에 담기
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
