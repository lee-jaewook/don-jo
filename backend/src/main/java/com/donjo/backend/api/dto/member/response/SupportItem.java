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
  // Support Hash값
  private String transactionHash;
  // SupportType(donation,item,wishlist)
  private String supportType;
  // Uid값
  private Long id;
  // 보낸 지갑 주소
  private FromMemberItem fromMember;
  // 보낸 지갑 주소
  private ToMemberItem toMember;
  // 보낸 이더
  private Double amountEth;
  // 보낸 시간
  private LocalDateTime sendTimeStamp;
  // 도착 시간
  private LocalDateTime arriveStamp;
  // 후원할 때 보낸 메세지
  private String sendMsg;
  // 후원 Dto에 담기
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
