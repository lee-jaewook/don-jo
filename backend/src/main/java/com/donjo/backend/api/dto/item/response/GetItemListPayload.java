package com.donjo.backend.api.dto.item.response;

import com.donjo.backend.solidity.Item.ItemSol;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetItemListPayload {
    // 배열에 크기
    int size;
    // 현재 페이지
    int pageNum;
    // 한 페이지 Item 개수
    int pageSize;
    // 다음 페이지 여부
    boolean hasMore;
    //
    List<ItemDetailPayload> itemList;
    // page,ItemList 입력 받아서 Dto에 저장
    public static GetItemListPayload from(int size, int pageNum, int pageSize,List<ItemSol> itemList){
        return GetItemListPayload.builder()
                .size(size)
                .pageNum(pageNum)
                .pageSize(pageSize)
                .hasMore(size > (pageNum + 1) * pageSize)
                .itemList(itemList.stream().map(itemSol -> ItemDetailPayload.from(itemSol)).collect(Collectors.toList()))
                .build();
    }
}
