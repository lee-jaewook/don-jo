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
    int size;
    int pageNum;
    int pageSize;
    boolean hasMore;
    List<ItemDetailPayload> itemList;

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
