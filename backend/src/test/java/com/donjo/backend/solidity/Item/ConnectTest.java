package com.donjo.backend.solidity.Item;

import com.donjo.backend.util.Web3jUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.web3j.applicationhandler.ApplicationHandler;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.DefaultGasProvider;

import java.util.List;
import java.util.Random;

@SpringBootTest
class ConnectTest {
    @Value("${eth.address}")
    String  masterAddress;
    @Value("${eth.privateKey}")
    String masterPrivateKey;
    @Value("${eth.rpcUtil}")
    String url;
    @Value("${eth.applicationAddress}")
    String contractAddress;

    @Autowired
    public Web3jUtil web3jUtil;

    @Test
    public void simpleCallTest(){
        Web3j web3j = Web3j.build(new HttpService(url));
        Credentials credentials = Credentials.create(masterPrivateKey);
        ContractGasProvider gasProvider = null;
        try {
            gasProvider = web3jUtil.getGasEstimate(web3j);
        } catch (Exception e) {
            gasProvider = new DefaultGasProvider();
        }
        ApplicationHandler contract = ApplicationHandler.load(contractAddress, web3j, credentials, gasProvider);

    }
}