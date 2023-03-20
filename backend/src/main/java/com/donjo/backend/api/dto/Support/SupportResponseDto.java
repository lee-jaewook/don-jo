package com.donjo.backend.api.dto.Support;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SupportResponseDto {

    private int uid;

    private String supportType;

//    private FromMember fromMember; 맴버 객체

//    private ToMember toMember; 맴버 객체

    private Double amountEth;

    private String arriveDate;
}
