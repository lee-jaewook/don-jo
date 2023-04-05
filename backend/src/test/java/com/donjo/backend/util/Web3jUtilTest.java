package com.donjo.backend.util;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.FunctionReturnDecoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.applicationhandler.ApplicationHandler;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.EthBlockNumber;
import org.web3j.protocol.core.methods.response.EthCall;
import org.web3j.protocol.core.methods.response.EthGetBalance;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.exceptions.TransactionException;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.DefaultGasProvider;
import org.web3j.tx.response.PollingTransactionReceiptProcessor;
import org.web3j.tx.response.TransactionReceiptProcessor;
import org.web3j.utils.Convert;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ExecutionException;
import static org.assertj.core.api.Assertions.*;
@SpringBootTest
class Web3jUtilTest {
    private ApplicationHandler contract;
    private Web3j web3j;

    @Autowired
    public Web3jUtilTest(Web3jUtil web3jUtil) {
        this.contract = web3jUtil.getContractApi();
        this.web3j = web3jUtil.getWeb3jApi();
    }

    @Test
    public void contractReceiptTest(){
        String transactionHash = "0x1cb5e2fd2293cc6d878ea33da6e255284ca611fb3ce6eeaef11608d64cc78e82";

        try {
            TransactionReceiptProcessor receiptProcessor = new PollingTransactionReceiptProcessor(web3j, 0, 2);
            TransactionReceipt receipt = receiptProcessor.waitForTransactionReceipt(transactionHash);

            if (receipt == null) {
                System.out.println(-1);
            }

            if (!receipt.isStatusOK()) {
                System.out.println(0); // 취소된 트랜잭션
            }

            // 여기에서 솔리디티 이벤트 로그에서 ID 값을 추출합니다.
            // 예를 들어, 스마트 컨트랙트의 이벤트가 `event MyEvent(uint256 indexed id);`와 같이 정의되었다고 가정합니다.
            // 그런 경우, 다음과 같이 이벤트 로그에서 ID 값을 추출할 수 있습니다.
            List<ApplicationHandler.SupportIdEventEventResponse> myEventResponses = contract.getSupportIdEventEvents(receipt);

            if (myEventResponses.isEmpty()) {
                System.out.println(0);
            }

            BigInteger id = myEventResponses.get(0).id;
            System.out.println(id.intValue()); // 완료된 트랜잭션의 ID 값

        } catch (IOException | TransactionException e) {
            System.out.println(-1);
        }
    }

    @Test
    public void stringConvertTest(){
        String testWord1 = "하이 안녕";
        String testWord2 = "HI, HI";

        System.out.println(convert(testWord1));
        System.out.println(convert(testWord2));

        assertThat(testWord1).isEqualTo(convert(testWord1));
        assertThat(testWord2).isEqualTo(convert(testWord2));
    }

    public String convert(String str){
        Utf8String utf8String = new Utf8String(str);
        byte[] byteArray = utf8String.getValue().getBytes(StandardCharsets.UTF_8);
        Utf8String result = new Utf8String(new String(byteArray, StandardCharsets.UTF_8));
        return result.toString();
    }

    @Test
    public void testConvertTest(){
        String title = "title 1";
        byte[] bytes = title.getBytes(StandardCharsets.UTF_8);
        System.out.println(new String(bytes, StandardCharsets.UTF_8));
    }

}