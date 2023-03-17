package com.donjo.backend.contracts;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.FunctionReturnDecoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.EthBlockNumber;
import org.web3j.protocol.core.methods.response.EthCall;
import org.web3j.protocol.core.methods.response.EthGetBalance;
import org.web3j.protocol.http.HttpService;
import org.web3j.simpleconstruct.SimpleConstruct;
import org.web3j.simplestorage.SimpleStorage;
import org.web3j.tx.RawTransactionManager;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.DefaultGasProvider;
import org.web3j.utils.Convert;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ExecutionException;

@SpringBootTest
class EC2ContractViewTest {
    @Value("${eth.address}")
    String myAddress;
    @Value("${eth.privateKey}")
    String privateKey;

    @Test
    public void testEc2BlockConnection() throws ExecutionException, InterruptedException {
        Web3j web3 = Web3j.build(new HttpService("http://j8a209.p.ssafy.io:8545"));
        EthBlockNumber result = web3.ethBlockNumber().sendAsync().get();
        System.out.println(" The Block Number is: " + result.getBlockNumber().toString());
    }

    @Test
    public void itemViewTest() throws Exception{
        Web3j web3j = Web3j.build(new HttpService("http://j8a209.p.ssafy.io:8545"));
        String myAddress = "0x288fB136C9291a4b62f1620bEE5901BEB2B0ffD7";
        String contractAddress = "0x1187fd6E64B1b5DCE529021B70081939BcB05938";

        Credentials credentials = Credentials.create(privateKey);

        RawTransactionManager transactionManager = new RawTransactionManager(web3j, credentials, 11155111);
        ContractGasProvider gasProvider = new ContractGasProvider() {
            @Override
            public BigInteger getGasPrice(String contractFunc) {
                return BigInteger.valueOf(40_100_000_000L);
            }

            @Override
            public BigInteger getGasPrice() {
                return BigInteger.valueOf(40_100_000_000L);
            }

            @Override
            public BigInteger getGasLimit(String contractFunc) {
                return BigInteger.valueOf(9_000_000);
            }

            @Override
            public BigInteger getGasLimit() {
                return BigInteger.valueOf(9_000_000);
            }
        };
        System.out.println("=====================================================================================");
        System.out.println("컨트랙트 배포 시작");
        SimpleConstruct contract = SimpleConstruct.deploy(web3j
                , transactionManager, gasProvider).send(); // gas limit
        System.out.println("컨트랙트 배포 완료" + contract.getContractAddress());
        System.out.println("=====================================================================================");
        System.out.println("컨트랙트 조회 시작");
        System.out.println(contract.readMyItems().send());
        System.out.println("컨트랙트 조회 완료");
        System.out.println("=====================================================================================");
    }

    @Test
    public void getBalanceTest() throws Exception{
        Web3j web3j = Web3j.build(new HttpService("http://j8a209.p.ssafy.io:8545"));
        String myAddress = "0x288fB136C9291a4b62f1620bEE5901BEB2B0ffD7";

        EthGetBalance ethGetBalance = web3j
                .ethGetBalance(myAddress, org.web3j.protocol.core.DefaultBlockParameterName.LATEST)
                .sendAsync()
                .get();


        BigInteger wei = ethGetBalance.getBalance();
        System.out.println(Convert.fromWei(new BigDecimal(wei), Convert.Unit.ETHER));
    }

    @Test
    public void getLastBlockNumTest() throws Exception{
        Web3j web3j = Web3j.build(new HttpService("http://j8a209.p.ssafy.io:8545"));
        EthBlockNumber blockNumber = web3j.ethBlockNumber().send();
        BigInteger latestBlockNumber = blockNumber.getBlockNumber();
        System.out.println(latestBlockNumber);
    }
}