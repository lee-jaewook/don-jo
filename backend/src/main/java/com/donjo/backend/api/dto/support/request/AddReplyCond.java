package com.donjo.backend.api.dto.support.request;

import com.donjo.backend.db.entity.Support;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Builder
public class AddReplyCond {
    @NotNull
    private String transactionHash;

    @NotNull
    private String replyMsg;

}
