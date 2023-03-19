//package com.donjo.backend.contracts;
//
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.web3j.crypto.Credentials;
//import org.web3j.crypto.RawTransaction;
//import org.web3j.crypto.TransactionEncoder;
//import org.web3j.protocol.Web3j;
//import org.web3j.protocol.core.DefaultBlockParameterName;
//import org.web3j.protocol.core.methods.response.EthBlockNumber;
//import org.web3j.protocol.core.methods.response.EthGetBalance;
//import org.web3j.protocol.core.methods.response.EthGetTransactionCount;
//import org.web3j.protocol.core.methods.response.EthSendTransaction;
//import org.web3j.protocol.http.HttpService;
//import org.web3j.simpleconstruct.SimpleConstruct;
//import org.web3j.tx.RawTransactionManager;
//import org.web3j.tx.gas.ContractGasProvider;
//import org.web3j.utils.Convert;
//import org.web3j.utils.Numeric;
//
//import java.math.BigDecimal;
//import java.math.BigInteger;
//import java.util.concurrent.ExecutionException;
//
//@SpringBootTest
//class TransactionTest {
//    @Value("${eth.address}")
//    String myAddress;
//    @Value("${eth.privateKey}")
//    String privateKey;
//
//    @Test
//    public void sendBalanceTest() throws Exception{
//        Web3j web3j = Web3j.build(new HttpService("http://j8a209.p.ssafy.io:8545"));
//        String fromAddress = "0x288fB136C9291a4b62f1620bEE5901BEB2B0ffD7";
//        String contractAddress = "0x1187fd6E64B1b5DCE529021B70081939BcB05938";
//        String toAddress = "0xb890800CA5f2b802758FC30AE1f2b3663796331A";
//        Credentials credentials = Credentials.create(privateKey);
//
//        // 송금할 Ether 금액 설정
//        BigDecimal etherAmount = BigDecimal.valueOf(1); // 1 Ether를 송금합니다.
//
//        // Ether를 Wei로 변환합니다.
//        BigInteger weiAmount = Convert.toWei(etherAmount, Convert.Unit.ETHER).toBigInteger();
//
//        // 트랜잭션을 위한 nonce 값 가져오기
//        EthGetTransactionCount transactionCount = web3j.ethGetTransactionCount(fromAddress, DefaultBlockParameterName.LATEST).send();
//        BigInteger nonce = transactionCount.getTransactionCount();
//
//        // 가스 한도 및 가스 가격 설정
//        BigInteger gasLimit = BigInteger.valueOf(21000);
//        BigInteger gasPrice = web3j.ethGasPrice().send().getGasPrice();
//
//        // RawTransaction 생성
//        RawTransaction rawTransaction = RawTransaction.createEtherTransaction(nonce, gasPrice, gasLimit, toAddress, weiAmount);
//
//        // 트랜잭션 서명
//        byte[] signedTransaction = TransactionEncoder.signMessage(rawTransaction, credentials);
//
//        // 서명된 트랜잭션을 RLP 인코딩
//        String hexTransaction = Numeric.toHexString(signedTransaction);
//
//        // 서명된 트랜잭션 전송
//        EthSendTransaction sendTransaction = web3j.ethSendRawTransaction(hexTransaction).send();
//
//        // 트랜잭션 해시 가져오기
//        String transactionHash = sendTransaction.getTransactionHash();
//        System.out.println("Transaction Hash: " + transactionHash);
//    }
//}