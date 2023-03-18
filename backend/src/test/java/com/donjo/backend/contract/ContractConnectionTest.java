package com.donjo.backend.contract;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.Contract;
import org.web3j.tx.gas.StaticGasProvider;

import java.io.IOException;
import java.math.BigInteger;
import java.security.SignatureException;
import java.util.Arrays;
import java.util.Collections;
import java.util.concurrent.ExecutionException;

import static org.assertj.core.api.Assertions.*;
import static org.web3j.tx.Transfer.GAS_LIMIT;
import static org.web3j.tx.gas.DefaultGasProvider.GAS_PRICE;

@SpringBootTest
class ContractConnectionTest {
    private final String url = "https://sepolia.infura.io/v3/ac3a17c914fd47a29cb5ed54315f746a";
    private final String myAddress = "0x288fB136C9291a4b62f1620bEE5901BEB2B0ffD7";
    private final String privateKey = "9c63b31a88c410c7d33265876407b31aea175c589ec82fff8d0bc4aa2baf150d";
    private final String contractAddress = "0x3Dd23147A7d974D34093FC9fA4caaa339CfCB2c6";

    private static final Logger log = LoggerFactory.getLogger(ContractConnectionTest.class);

    @Test
    public void testCheckContractConnection() throws Exception {
        Web3j web3j = Web3j.build(new HttpService(url));
        log.info("Connected to Ethereum client version: "
                + web3j.web3ClientVersion().send().getWeb3ClientVersion());


        Credentials credentials = Credentials.create(privateKey);
        log.info("Credentials loaded");
    }

    @Test
    void testWrite() throws ExecutionException, InterruptedException {
        Web3j web3j = Web3j.build(new HttpService(url));
        Function function = new Function(
                "store",  // function we're calling
                Arrays.asList(new Uint256(10)),  // Parameters to pass as Solidity Types
                Collections.emptyList());

        String encodedFunction = FunctionEncoder.encode(function);
        Transaction transaction = Transaction.createFunctionCallTransaction(
                myAddress, BigInteger.valueOf(10000), BigInteger.valueOf(10000), BigInteger.valueOf(100), contractAddress, encodedFunction);

        org.web3j.protocol.core.methods.response.EthSendTransaction transactionResponse =
                web3j.ethSendTransaction(transaction).sendAsync().get();

        String transactionHash = transactionResponse.getTransactionHash();
        System.out.println(transactionHash);
    }
}