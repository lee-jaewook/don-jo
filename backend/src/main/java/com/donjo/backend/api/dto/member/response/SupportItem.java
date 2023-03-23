package com.donjo.backend.api.dto.member.response;

import com.donjo.backend.db.entity.Support;
import java.time.LocalDateTime;

import com.donjo.backend.solidity.support.SupportSol;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder(builderMethodName = "MakeSupportItemBuilder")
public class SupportItem {
  private String transactionHash;
  private String supportType;
  private Long id;
  private FromMemberItem fromMember;
  private ToMemberItem toMember;
  private Long amountEth;
  private LocalDateTime sendTimeStamp;
  private LocalDateTime arriveStamp;
  private String sendMsg;

  public static SupportItem builder(Support support, FromMemberItem fromMember, ToMemberItem toMember, SupportSol blockSupportSol) {
    return MakeSupportItemBuilder()
        .transactionHash(support.getTransactionHash())
        .supportType(support.getSupportType())
        .id(support.getSupportUid())
        .fromMember(fromMember)
        .toMember(toMember)
        .amountEth(blockSupportSol.getAmount())
        .sendTimeStamp(support.getSendTimeStamp())
        .arriveStamp(support.getArriveTimeStamp())
        .sendMsg(support.getSendMsg())
        .build();

  }

}
