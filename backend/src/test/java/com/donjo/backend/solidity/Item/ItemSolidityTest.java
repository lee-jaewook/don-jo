package com.donjo.backend.solidity.Item;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Random;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class ItemSolidityTest {

    @Autowired
    private ItemSolidity itemSolidity;

    @Test
    public void itemBuildTest(){
        String seller = "0x288fB136C9291a4b62f1620bEE5901BEB2B0ffD7";
        int size = itemSolidity.getMemberItemList(seller).get().size();

        Random random = new Random();
        Long id = Math.abs(random.nextLong());
        String title = "Title " + id;
        String imgPath = "ImgPath " + id;
        String description = "Description " + id;
        Long price = 1000000L;
        String message = "Message " + id;
        String filePath = "FilePath " + id;
        boolean isDeleted = false;
        Item item = Item.builder()
                .id(id)
                .title(title)
                .imgPath(imgPath)
                .description(description)
                .price(price)
                .message(message)
                .filePath(filePath)
                .isDeleted(isDeleted)
                .seller(seller).build();

        itemSolidity.addMemberItem(item);
    }

//    @Test
//    public void getItemListTest(){
//        String seller = "0x288fB136C9291a4b62f1620bEE5901BEB2B0ffD7";
//        List<Item> result = itemSolidity.getMemberItemList(seller).get();
//        for (Item item : result) {
//            System.out.println(item.getTitle());
//        }
//    }
//
//    @Test
//    public void getItemDetailTest(){
//        Item result = itemSolidity.getItemDetail(1L).get();
//        System.out.println(result.getTitle());
//        System.out.println(result.getPrice());
//        System.out.println(result.isDeleted());
//    }
//
//    @Test
//    public void deleteMemberItemTest(){
//        String seller = "0x288fB136C9291a4b62f1620bEE5901BEB2B0ffD7";
//        itemSolidity.deleteMemberItem(seller, 1L);
//        assertThat(itemSolidity.getItemDetail(1L).get().isDeleted()).isEqualTo(true);
//    }


}