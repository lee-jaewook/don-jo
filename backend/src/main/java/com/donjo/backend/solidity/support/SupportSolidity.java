package com.donjo.backend.solidity.support;

import com.donjo.backend.util.Web3jUtil;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.web3j.applicationhandler.ApplicationHandler;

import java.math.BigInteger;
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

    public Optional<Support> getSupportDetail(String address, Long id){
        Support support = null;
        try {
            support = Support.fromSol(contract.getSupportDetail(address, BigInteger.valueOf(id)).send());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return Optional.ofNullable(support);
    }

    /**
     * 지갑 주소를 입력받아 해당 지갑이 받은 후원 내역을 리턴합니다.
     * @param address(지갑 주소)
     * @return 후원 내역
     */
    public Optional<List<Support>> getSupportList(String address){
        List<Support> list = null;
        try {
           List<ApplicationHandler.Support> response = contract.getSupportList(address).send();
           list = response.stream().map(support -> Support.fromSol(support)).collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return Optional.ofNullable(list);
    }




}
