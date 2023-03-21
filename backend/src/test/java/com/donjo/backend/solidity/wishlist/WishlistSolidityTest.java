package com.donjo.backend.solidity.wishlist;

import com.donjo.backend.solidity.Item.ItemSolidity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class WishlistSolidityTest {

    @Autowired
    private WishlistSolidity wishlistSolidity;

    @Test
    public void addMemberWishListTest(){
        Wishlist wishlist = Wishlist.builder()
                .id(1L)
                .title("Example Wishlist Item")
                .imgPath("https://example.com/image.jpg")
                .description("This is a description for the example wishlist item.")
                .collectedAmount(1000000000000000000L) // 1 Ether in wei
                .targetAmount(5000000000000000000L) // 5 Ether in wei
                .message("Thank you for your support!")
                .isClosed(false)
                .seller("0x1234567890abcdef1234567890abcdef12345678")
                .build();
        wishlistSolidity.addMemberWishList(wishlist);
    }

//    @Test
//    public void getMemberWishlistDetail(){
//        Wishlist wishlist = wishlistSolidity.getMemberWishListDetail(1L).get();
//        System.out.println(wishlist.getDescription());
//        assertThat(wishlist.getDescription()).isEqualTo("This is a description for the example wishlist item.");
////        assertThat(wishlist.getDescription()).isEqualTo("This is a description for the example wishlist item.?");
//    }

}