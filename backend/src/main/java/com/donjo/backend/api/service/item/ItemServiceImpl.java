package com.donjo.backend.api.service.item;

import com.donjo.backend.api.dto.item.request.AddItemCond;
import com.donjo.backend.api.dto.item.request.UpdateItemCond;
import com.donjo.backend.exception.NoContentException;
import com.donjo.backend.solidity.Item.ItemSol;
import com.donjo.backend.solidity.Item.ItemSolidity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService{

    private final ItemSolidity itemSolidity;

    @Override
    public List<ItemSol> getItemList(String address, int pageNum, int pageSize) {
        // null 체크
        List<ItemSol> list = itemSolidity.getMemberItemList(address)
                .orElseThrow(()-> new NoContentException());

        // 페이지네이션
        int startIdx = pageNum * pageSize;
        int endIdx = (pageNum + 1) * pageSize - 1;
        if(list.size() == 0 || list.size() <= startIdx) {
            throw new NoContentException();
        }
        List<ItemSol> result = new ArrayList<>();
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
    public ItemSol getItemDetail(Long uid) {
        ItemSol itemSol = itemSolidity.getItemDetail(uid)
                .orElseThrow(()-> new NoContentException("데이터가 없습니다."));
        if(itemSol.isDeleted()) throw new NoContentException("삭제된 아이템 입니다.");
        return itemSol;
    }
}
