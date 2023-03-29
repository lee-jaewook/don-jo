package com.donjo.backend.api.service.support;

import com.donjo.backend.api.dto.support.request.AddReplyCond;
import com.donjo.backend.api.dto.support.request.AddSupportCond;
import com.donjo.backend.api.dto.support.request.DonationSettingCond;
import com.donjo.backend.api.dto.support.response.FindSupportDetailPayload;
import com.donjo.backend.api.dto.support.response.FindTop10Payload;

import java.util.List;
import java.util.Map;

public interface SupportService {
    // 수익금 조회
    Double getEarning(String address,String type, int period);

    // 후원 개수 조회
    int getSupportCount(String type,String memberAddress);

    // DB에 후원 저장하기
    void createSupports(AddSupportCond addSupportCond);

    // 서포트 조회
    Map<String, Object> getSupports(String memberAddress, String Type, int pageNum, int pageSize);

    // 서포트 Detail 조회
    FindSupportDetailPayload getSupportDetail(String toAddress, Long supportUid);

    // 도네이션 정보 가져오기
    DonationSettingCond getDonationSetting(String memberAddress);

    // 도네이션 정보 수정하기
    void changeDonation(DonationSettingCond donationSettingCond, String memberAddress);

    // 인트로 페이지 최근 후원 10개 가져오기
    List<FindTop10Payload> getTop10();

    // 후원 댓글 저장
    void saveReply(AddReplyCond dto);

    // 후원 댓글 삭제
    void deleteReply(String transactionHash);
}
