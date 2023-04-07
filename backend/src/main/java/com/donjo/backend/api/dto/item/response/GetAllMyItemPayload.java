package com.donjo.backend.api.dto.item.response;

import com.donjo.backend.solidity.Item.ItemSol;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetAllMyItemPayload {
    // Item ID
    private Long id;
    // Item 제목
    private String title;
    // ItemSol에서 Dto에 저장
    public static GetAllMyItemPayload from(ItemSol itemSol){
        return GetAllMyItemPayload.builder()
                .id(itemSol.getId())
                .title(itemSol.getTitle())
                .build();
    }
}
