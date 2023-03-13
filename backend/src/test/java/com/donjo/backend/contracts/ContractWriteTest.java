package com.donjo.backend.contracts;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;
import org.web3j.simplestorage.SimpleStorage;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.EthGasPrice;
import org.web3j.protocol.core.methods.response.EthBlockNumber;

import java.io.IOException;
import java.math.BigInteger;

@SpringBootTest
class ContractWriteTest {
    @Value("${eth.address}")
    String myAddress;
    @Value("${eth.privateKey}")
    String privateKey;

    @Test
    void testContractWrite() throws Exception {
        boolean flag = true;
        if(flag) return;
        Web3j web3j = Web3j.build(new HttpService("https://sepolia.infura.io/v3/ac3a17c914fd47a29cb5ed54315f746a"));


        String contractAddress = "0xd2Acb77F482f65409779deD406A26ed5f5305647";

        SimpleStorage contract = SimpleStorage.load(contractAddress, web3j
                ,Credentials.create(privateKey)
                ,BigInteger.valueOf(777096850) // gas price
                ,BigInteger.valueOf(5000000)); // gas limit
        System.out.println("=====================================================================================");
        System.out.println(contract.write(BigInteger.valueOf(40)).send());
        System.out.println("=====================================================================================");
        System.out.println(contract.read().send());
    }

    @Test
    void testContractView() throws Exception {
        Web3j web3j = Web3j.build(new HttpService("https://sepolia.infura.io/v3/ac3a17c914fd47a29cb5ed54315f746a"));
        String myAddress = "0x288fB136C9291a4b62f1620bEE5901BEB2B0ffD7";
        String privateKey = "9c63b31a88c410c7d33265876407b31aea175c589ec82fff8d0bc4aa2baf150d";
        String contractAddress = "0xd2Acb77F482f65409779deD406A26ed5f5305647";

        SimpleStorage contract = SimpleStorage.load(contractAddress, web3j
                ,Credentials.create(privateKey)
                ,BigInteger.valueOf(777096850) // gas price
                ,BigInteger.valueOf(5000000)); // gas limit
        System.out.println("=====================================================================================");
        System.out.println(contract.read().send());
        System.out.println("=====================================================================================");

    }
}