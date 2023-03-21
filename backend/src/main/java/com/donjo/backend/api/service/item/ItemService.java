package com.donjo.backend.api.service.item;

import com.donjo.backend.api.dto.item.request.AddItemCond;
import com.donjo.backend.api.dto.item.request.UpdateItemCond;
import com.donjo.backend.solidity.Item.Item;

import java.util.List;
import java.util.Optional;

public interface ItemService {
    List<Item> getItemList(String address);
    Optional<Item> getItemDetail(Long uid);
    void addItem(String address, AddItemCond cond);
    void deleteMemberItem(String address, Long uid);
    void updateMemberItem(String address, UpdateItemCond cond);
}
