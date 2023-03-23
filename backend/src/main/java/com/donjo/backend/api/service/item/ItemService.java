package com.donjo.backend.api.service.item;

import com.donjo.backend.api.dto.item.request.AddItemCond;
import com.donjo.backend.api.dto.item.request.UpdateItemCond;
import com.donjo.backend.solidity.Item.ItemSol;

import java.util.List;

public interface ItemService {
    List<ItemSol> getItemList(String address, int pageNum, int pageSize);
    ItemSol getItemDetail(Long uid);
    void addItem(String address, AddItemCond cond);
    void deleteMemberItem(String address, Long uid);
    void updateMemberItem(String address, UpdateItemCond cond);
}
