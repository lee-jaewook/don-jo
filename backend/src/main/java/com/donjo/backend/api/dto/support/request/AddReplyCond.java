package com.donjo.backend.api.dto.support.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
@Builder
public class AddReplyCond {
    // transactionHash 값
    @NotNull
    private String transactionHash;

    // 댓글 값
    @NotNull
    private String replyMsg;

}
