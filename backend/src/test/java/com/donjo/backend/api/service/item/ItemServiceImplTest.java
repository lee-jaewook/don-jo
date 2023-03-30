package com.donjo.backend.api.service.item;

import com.donjo.backend.api.dto.item.request.AddItemCond;
import com.donjo.backend.api.dto.item.request.UpdateItemCond;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Random;

@SpringBootTest
class ItemServiceImplTest {

    @Autowired
    public ItemService itemService;

    @Test
    public void addTest(){
        String seller = "0x288fB136C9291a4b62f1620bEE5901BEB2B0ffD7";

        Random random = new Random();
        Long id = Math.abs(random.nextLong());

        AddItemCond addItemCond = AddItemCond.builder()
                .title("Test Title" + id)
                .imgPath("test/image"+id+".jpg")
                .description("Test Description"+id)
                .price(100.0)
                .message("Test Message"+id)
                .filePath("test/file"+id+".txt")
                .build();

        itemService.addItem(seller, addItemCond);
    }

    @Test
    public void updateTest(){
        String seller = "0x288fB136C9291a4b62f1620bEE5901BEB2B0ffD7";

        Random random = new Random();
        Long id = Math.abs(random.nextLong());

        UpdateItemCond addItemCond = UpdateItemCond.builder()
                .id(1L)
                .title("Test Update Title" + id)
                .imgPath("test/image"+id+".jpg")
                .description("Test Description"+id)
                .price(100.0)
                .message("Test Message"+id)
                .filePath("test/file"+id+".txt")
                .build();

        itemService.updateMemberItem(seller, addItemCond);
    }
}