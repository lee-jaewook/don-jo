package com.donjo.backend.api.dto.support.response;

import com.donjo.backend.api.dto.support.FindSupportItem;
import com.donjo.backend.db.entity.Member;
import com.donjo.backend.db.entity.Support;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@ToString
@Builder
public class FindSupportPayload {
    // 다음 페이지 여부
    private boolean hasMore;
    // 서포트 리스트
    private List<FindSupportItem> supportList;

    // Dto에 담기
    public static FindSupportPayload getSupportList(boolean hasMore,List<FindSupportItem> supportList){
        FindSupportPayload findSupportPayload = FindSupportPayload.builder()
                .hasMore(hasMore)
                .supportList(supportList)
                .build();
        return findSupportPayload;
    }
}
