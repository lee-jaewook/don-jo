package com.donjo.backend.api.service.item;

import com.donjo.backend.api.dto.item.request.AddItemCond;
import com.donjo.backend.api.dto.item.request.UpdateItemCond;
import com.donjo.backend.api.dto.item.response.GetAllMyItemPayload;
import com.donjo.backend.api.dto.item.response.GetItemListPayload;
import com.donjo.backend.api.dto.item.response.ItemDetailPayload;
import com.donjo.backend.exception.NoContentException;
import com.donjo.backend.solidity.Item.ItemSol;
import com.donjo.backend.solidity.Item.ItemSolidity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService{
    // itemSolidity를 선언
    private final ItemSolidity itemSolidity;

    @Override
    public GetItemListPayload getItemList(String address, int pageNum, int pageSize) {
        // null 체크
        // 회원의 아이템 목록을 가져옵니다. 이때, orElseThrow() 메소드를 이용하여 결과가 존재하지 않는 경우 예외(NoContentException)를 발생시킵니다.
        List<ItemSol> list = itemSolidity.getMemberItemList(address)
                .orElseThrow(()-> new NoContentException());

        // 다음으로, 가져온 아이템 목록을 역순(reverse)으로 정렬합니다.
        Collections.reverse(list);

        // 페이지네이션
        int startIdx = pageNum * pageSize;
        int endIdx = (pageNum + 1) * pageSize - 1;
        if(list.size() == 0 || list.size() <= startIdx) {
            throw new NoContentException();
        }
        List<ItemSol> result = new ArrayList<>();
        //시작 인덱스부터 끝 인덱스까지의 아이템을 result 리스트에 추가
        for (int i = startIdx; i < list.size(); i++) {
            if(i > endIdx) break;
            result.add(list.get(i));
        }
        // 아이템 목록의 크기, 페이지 번호, 페이지 크기, 그리고 결과 리스트를 담아 반환
        return GetItemListPayload.from(list.size(), pageNum, pageSize, result);
    }

    @Override
    public List<GetAllMyItemPayload> getAllItems(String address) {
        // null 체크
        // 회원의 아이템 목록을 가져옵니다. 이때, orElseThrow() 메소드를 이용하여 결과가 존재하지 않는 경우 예외(NoContentException)를 발생시킵니다.
        List<ItemSol> list = itemSolidity.getMemberItemList(address)
                .orElseThrow(()-> new NoContentException());

        // 다음으로, 가져온 아이템 목록을 역순(reverse)으로 정렬합니다.
        Collections.reverse(list);
        return list.stream().map(itemSol -> GetAllMyItemPayload.from(itemSol)).collect(Collectors.toList());
    }

    @Override
    // cond 객체에 address를 추가한 결과를 Solidity 스마트 컨트랙트에 저장합니다.
    public void addItem(String address, AddItemCond cond) {
        itemSolidity.addMemberItem(cond.from(address));
    }

    @Override
    //  address와 uid에 해당하는 아이템을 Solidity 스마트 컨트랙트에서 삭제
    public void deleteMemberItem(String address, Long uid) {
        itemSolidity.deleteMemberItem(address, uid);
    }

    @Override
    public void updateMemberItem(String address, UpdateItemCond cond) {
        //  cond 객체에 address를 추가한 결과를 Solidity 스마트 컨트랙트에 업데이트
        itemSolidity.updateMemberItem(cond.from(address, getItemDetail(cond.getId())));
    }

    @Override
    public boolean isPurchased(String memberAddress, Long itemUid) {
        // memberAddress와 itemUid를 파라미터로 받아 해당 아이템이 구매된 상태인지를 확인
        return itemSolidity.isPurchased(memberAddress, itemUid);
    }

    @Override
    public ItemDetailPayload getItemDetail(Long uid) {
        //  getItemDetail 메소드를 사용하여 특정 아이템의 상세 정보를 가져옴 없으면 204
        ItemSol itemSol = itemSolidity.getItemDetail(uid)
                .orElseThrow(()-> new NoContentException("데이터가 없습니다."));
        // 해당 아이템이 삭제된 상태인 경우(isDeleted() 메소드가 NoContentException 예외를 발생
        if(itemSol.isDeleted()) throw new NoContentException("삭제된 아이템 입니다.");
        return ItemDetailPayload.from(itemSol);
    }
}
