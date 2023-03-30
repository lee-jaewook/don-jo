package com.donjo.backend.api.service.wishlist;

import com.donjo.backend.api.dto.wishlist.request.UpdateWishlistCond;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class WishlistServiceImplTest {

    @Autowired
    private WishlistService wishlistService;

    @Test
    void updateTest(){
        String memberAddress = "0x288fB136C9291a4b62f1620bEE5901BEB2B0ffD7";
        UpdateWishlistCond cond = UpdateWishlistCond.builder()
                .id(6L)
                .title("타이틀 변경 테스트2")
                .description("설명 변경 테스트")
                .imgPath("이미지 변경 테스트")
                .targetAmount(10.0)
                .message("메세지 변경 테스트")
                .build();

        wishlistService.updateWishlist(memberAddress, cond);
    }
}