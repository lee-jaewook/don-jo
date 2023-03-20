package com.donjo.backend.util;

import com.donjo.backend.config.jwt.TokenProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.applicationhandler.ApplicationHandler;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.EthEstimateGas;
import org.web3j.protocol.core.methods.response.EthGasPrice;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.DefaultGasProvider;
import org.web3j.tx.gas.StaticGasProvider;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

@Component
@Slf4j
public class Web3jUtil {

    @Value("${eth.address}")
    String  masterAddress;
    @Value("${eth.privateKey}")
    String masterPrivateKey;
    @Value("${eth.rpcUtil}")
    String url;
    @Value("${eth.applicationAddress}")
    String contractAddress;

    public ApplicationHandler getContractApi(){
        Web3j web3j = Web3j.build(new HttpService(url));
        Credentials credentials = Credentials.create(masterPrivateKey);

        // 스마트 컨트랙트 주소와 가스 제공자를 설정합니다.
        ContractGasProvider gasProvider = null;
        try {
            gasProvider = getGasEstimate(web3j);
        } catch (Exception e) {
            gasProvider = new DefaultGasProvider();
        }

        // 자동 생성된 Wrapper 클래스를 사용하여 스마트 컨트랙트 인스턴스를 생성합니다.
        return ApplicationHandler.load(contractAddress, web3j, credentials, gasProvider);
    }

    public StaticGasProvider getGasEstimate(Web3j web3j) throws Exception{
        EthGasPrice ethGasPrice = web3j.ethGasPrice().send();
        BigInteger gasPrice = ethGasPrice.getGasPrice();
        log.info("Current Gas Price: " + gasPrice);

        // 예제 트랜잭션 데이터
        String from = masterAddress;
        String to = contractAddress;
        BigInteger value = BigInteger.ZERO;
        String data = ""; // 트랜잭션에 대한 입력 데이터 (예: 스마트 컨트랙트 호출)

        // 적정 GAS_LIMIT를 추정합니다.
        EthEstimateGas ethEstimateGas = web3j.ethEstimateGas(
                        org.web3j.protocol.core.methods.request.Transaction.createEthCallTransaction(from, to, data))
                .send();
        BigInteger gasLimit = ethEstimateGas.getAmountUsed();
        log.info("Estimated Gas Limit: " + gasLimit);

        // StaticGasProvider 사용하여 가스 가격 및 가스 한도 설정
        return new StaticGasProvider(gasPrice, gasLimit);
    }

//    public byte[] convertToByte(String str){
//        Utf8String utf8String = new Utf8String(str);
//        return utf8String.getValue().getBytes(StandardCharsets.UTF_8);
//    }
//
//    public String convertToString(byte[] byteArray){
//        Utf8String result = new Utf8String(new String(byteArray, StandardCharsets.UTF_8));
//        return result.toString();
//    }
}
