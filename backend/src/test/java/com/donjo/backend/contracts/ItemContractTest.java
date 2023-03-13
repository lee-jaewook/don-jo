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
import org.web3j.protocol.http.HttpService;
import org.web3j.simpleconstruct.SimpleConstruct;

import java.io.IOException;
import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ExecutionException;

@SpringBootTest
class ItemContractTest {
    @Value("${eth.address}")
    String myAddress;
    @Value("${eth.privateKey}")
    String privateKey;

    @Test
    public void testBlockConnection() throws ExecutionException, InterruptedException {
        Web3j web3 = Web3j.build(new HttpService("https://sepolia.infura.io/v3/ac3a17c914fd47a29cb5ed54315f746a"));
        EthBlockNumber result = web3.ethBlockNumber().sendAsync().get();
        System.out.println(" The Block Number is: " + result.getBlockNumber().toString());
    }

    @Test
    void testView() throws IOException {
        Web3j web3j = Web3j.build(new HttpService("https://sepolia.infura.io/v3/ac3a17c914fd47a29cb5ed54315f746a"));
        String myAddress = "0x288fB136C9291a4b62f1620bEE5901BEB2B0ffD7";
        String contractAddress = "0x51F3E7ba190E5e8BAf850E7324f500d3BCf27883";

        Function function = new Function("retrieve",
                Collections.emptyList(),
                Arrays.asList(new TypeReference<Uint256>() {}));

        //3. transaction 제작
        Transaction transaction = Transaction.createEthCallTransaction(myAddress, contractAddress,
                FunctionEncoder.encode(function));

        //4. ethereum 호출후 결과 가져오기
        EthCall ethCall = web3j.ethCall(transaction, DefaultBlockParameterName.LATEST).send();

        //5. 결과값 decode
        List<Type> decode = FunctionReturnDecoder.decode(ethCall.getResult(),
                function.getOutputParameters());

        System.out.println("ethCall.getResult() = " + ethCall.getResult());
        System.out.println("getValue = " + decode.get(0).getValue());
        System.out.println("getType = " + decode.get(0).getTypeAsString());
    }

    @Test
    public void itemViewTest() throws Exception{
        Web3j web3j = Web3j.build(new HttpService("https://sepolia.infura.io/v3/ac3a17c914fd47a29cb5ed54315f746a"));
        String myAddress = "0x288fB136C9291a4b62f1620bEE5901BEB2B0ffD7";
        String contractAddress = "0x1187fd6E64B1b5DCE529021B70081939BcB05938";

        SimpleConstruct contract = SimpleConstruct.load(contractAddress, web3j
                , Credentials.create(privateKey)
                , BigInteger.valueOf(777096850) // gas price
                ,BigInteger.valueOf(5000000)); // gas limit
        System.out.println("=====================================================================================");
        System.out.println(contract.readMyItems().send());
        System.out.println("=====================================================================================");
    }

}