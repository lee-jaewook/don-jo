package com.donjo.backend.api.service.item;

import com.donjo.backend.api.dto.item.request.AddItemCond;
import com.donjo.backend.api.dto.item.request.UpdateItemCond;
import com.donjo.backend.api.dto.item.response.GetAllMyItemPayload;
import com.donjo.backend.api.dto.item.response.GetItemListPayload;
import com.donjo.backend.api.dto.item.response.ItemDetailPayload;
import com.donjo.backend.solidity.Item.ItemSol;

import java.util.List;

public interface ItemService {
    // Address를 이용하여 ItemList 가져오기(Pagination)
    GetItemListPayload getItemList(String address, int pageNum, int pageSize);
    // Address를 이용하여 전체 Item 가져오기
    List<GetAllMyItemPayload> getAllItems(String address);
    // ItemUid를 이용하여 Detail 조회
    ItemDetailPayload getItemDetail(Long uid);
    // Address를 이용하여 아이템 추가
    void addItem(String address, AddItemCond cond);
    // Address와 Uid를 이용하여 특정 Item 제거
    void deleteMemberItem(String address, Long uid);
    // Address를 이용하여 특정 Item Update
    void updateMemberItem(String address, UpdateItemCond cond);
    // memberAddress와 ItemUid로 아이템 구매 여부 체크
    boolean isPurchased(String memberAddress, Long itemUid);
}
