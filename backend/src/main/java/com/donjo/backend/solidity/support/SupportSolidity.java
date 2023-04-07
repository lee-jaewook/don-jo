package com.donjo.backend.solidity.support;

import com.donjo.backend.exception.BadRequestException;
import com.donjo.backend.util.ConvertUtil;
import com.donjo.backend.util.Web3jUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.web3j.applicationhandler.ApplicationHandler;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class SupportSolidity {
    private ApplicationHandler contract;

    @Autowired
    public SupportSolidity(Web3jUtil web3jUtil) {
        this.contract = web3jUtil.getContractApi();
    }

    /**
     * 회원의 주소와 후원 id를 입력받아 후원 상세 내역을 조회합니다.
     * @param address
     * @param id
     * @return
     */
    public Optional<SupportSol> getSupportDetail(String address, Long id){
        SupportSol supportSol = null;
        try {
            // id로 SupportDetail 가져오기
            supportSol = SupportSol.fromSol(contract.getSupportDetail(address, BigInteger.valueOf(id)).send());
        } catch (Exception e) {
            throw new BadRequestException(e.getMessage());
        }
        return Optional.ofNullable(supportSol);
    }

    /**
     * 지갑 주소를 입력받아 해당 지갑이 받은 후원 내역을 리턴합니다.
     * @param address(지갑 주소)
     * @return 후원 내역
     */
    public Optional<List<SupportSol>> getSupportList(String address){
        List<SupportSol> list = null;
        try {
            // address로 SupportList 가져오기
           List<ApplicationHandler.SupportSol> response = contract.getSupportList(address).send();
           // SupportSol에 담기
           list = response.stream().map(support -> SupportSol.fromSol(support)).collect(Collectors.toList());
        } catch (Exception e) {
            throw new BadRequestException(e.getMessage());
        }
        return Optional.ofNullable(list);
    }

    /**
     * 회원의 주소와 후원 ID를 입력받아 해당 후원의 요청 시간을 가져옵니다
     * @param address
     * @param uid
     * @return LocalDateTime(요청 시간)
     */
    public Optional<LocalDateTime> getArriveTimeStamp(String address, Long uid){
        LocalDateTime result = null;
        try {
            // Address와 Uid로 보낸 시간 가져오기
            BigInteger response = contract.getSupportArriveTime(address, BigInteger.valueOf(uid)).send();
            // 보낸시간 LocalDateTime으로 감싸주기
            result = ConvertUtil.convertToLocalDateTime(response);
        } catch (Exception e) {
            throw new BadRequestException("도착 정보를 알 수 없습니다.");
        }
        return Optional.ofNullable(result);
    }




}
