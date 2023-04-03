package com.donjo.backend.api.dto.support.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
@Builder
public class FindSupportListPayload {
    // 다음 페이지 여부
    private boolean hasMore;
    // 서포트 리스트
    private List<FindSupportItem> supportList;

    // Dto에 담기
    public static FindSupportListPayload getSupportList(boolean hasMore, List<FindSupportItem> supportList){
        return FindSupportListPayload.builder()
                .hasMore(hasMore)
                .supportList(supportList)
                .build();
    }
}
