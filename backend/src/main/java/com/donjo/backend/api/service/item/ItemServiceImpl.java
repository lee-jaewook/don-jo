package com.donjo.backend.api.service.item;

import com.donjo.backend.api.dto.item.request.AddItemCond;
import com.donjo.backend.api.dto.item.request.UpdateItemCond;
import com.donjo.backend.exception.NoContentException;
import com.donjo.backend.solidity.Item.Item;
import com.donjo.backend.solidity.Item.ItemSolidity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService{

    private final ItemSolidity itemSolidity;

    @Override
    public List<Item> getItemList(String address, int pageNum, int pageSize) {
        // null 체크
        List<Item> list = itemSolidity.getMemberItemList(address)
                .orElseThrow(()-> new NoContentException());

        // 페이지네이션
        int startIdx = pageNum * pageSize;
        int endIdx = (pageNum + 1) * pageSize - 1;
        if(list.size() == 0 || list.size() <= startIdx) {
            throw new NoContentException();
        }
        List<Item> result = new ArrayList<>();
        for (int i = startIdx; i < list.size(); i++) {
            if(i > endIdx) break;
            result.add(list.get(i));
        }

        // 정렬
        Collections.reverse(result);
        return result;
    }

    @Override
    public void addItem(String address, AddItemCond cond) {
        itemSolidity.addMemberItem(cond.from(address));
    }

    @Override
    public void deleteMemberItem(String address, Long uid) {
        itemSolidity.deleteMemberItem(address, uid);
    }

    @Override
    public void updateMemberItem(String address, UpdateItemCond cond) {
        itemSolidity.updateMemberItem(cond.from(address));
    }

    @Override
    public Item getItemDetail(Long uid) {
        Item item = itemSolidity.getItemDetail(uid)
                .orElseThrow(()-> new NoContentException("데이터가 없습니다."));
        if(item.isDeleted()) throw new NoContentException("삭제된 아이템 입니다.");
        return item;
    }
}
