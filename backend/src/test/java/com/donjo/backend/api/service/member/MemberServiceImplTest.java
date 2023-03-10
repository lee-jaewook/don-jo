package com.donjo.backend.api.service.member;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;
import java.security.SignatureException;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ExecutionException;

import org.web3j.abi.FunctionReturnDecoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.protocol.Web3j;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.datatypes.Function;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.EthCall;
import org.web3j.protocol.http.HttpService;
import org.web3j.crypto.ECDSASignature;
import org.web3j.crypto.Hash;
import org.web3j.crypto.Keys;
import org.web3j.crypto.Sign;
import org.web3j.crypto.Sign.SignatureData;
import org.web3j.protocol.core.methods.response.EthBlockNumber;
import org.web3j.utils.Numeric;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class MemberServiceImplTest {
    public static final String PERSONAL_MESSAGE_PREFIX = "\u0019Ethereum Signed Message:\n";


    @Test
    public void testCheckSignature() throws SignatureException {
        String address = "0x765EFDd658794B0D15056C53326587A072ABB4De";
        String signature = "0x17cb5d84af8970350b9e412d6583769b08dcc0a1bc659248de72589b10e8d72965b56095116ece7885d4a34ab7df59c60f92db3b47d46a83fba5e700b8ef62241b";
    }

    @Test
    public void testSignatureFunc(){
        String signature =
                "0x17cb5d84af8970350b9e412d6583769b08dcc0a1bc659248de72589b10e8d72965b56095116ece7885d4a34ab7df59c60f92db3b47d46a83fba5e700b8ef62241b";

        String address = "0x765EFDd658794B0D15056C53326587A072ABB4De";
        String message = "Login to my app with address";

        String prefix = PERSONAL_MESSAGE_PREFIX + message.length();
        byte[] msgHash = Hash.sha3((prefix + message).getBytes());

        byte[] signatureBytes = Numeric.hexStringToByteArray(signature);
        byte v = signatureBytes[64];
        if (v < 27) {
            v += 27;
        }

        SignatureData sd =
                new SignatureData(
                        v,
                        (byte[]) Arrays.copyOfRange(signatureBytes, 0, 32),
                        (byte[]) Arrays.copyOfRange(signatureBytes, 32, 64));

        String addressRecovered = null;
        boolean match = false;

        // Iterate for each possible key to recover
        for (int i = 0; i < 4; i++) {
            BigInteger publicKey =
                    Sign.recoverFromSignature(
                            (byte) i,
                            new ECDSASignature(
                                    new BigInteger(1, sd.getR()), new BigInteger(1, sd.getS())),
                            msgHash);

            if (publicKey != null) {
                addressRecovered = "0x" + Keys.getAddress(publicKey);

                if (addressRecovered.equals(address)) {
                    match = true;
                    break;
                }
            }
        }
        System.out.println(addressRecovered);
        System.out.println(address);
        assertThat(addressRecovered.equals(address));
        assertThat(!match);
    }

    @Test
    public void testBlockConnection() throws ExecutionException, InterruptedException {
        Web3j web3 = Web3j.build(new HttpService("https://sepolia.infura.io/v3/ac3a17c914fd47a29cb5ed54315f746a"));
        EthBlockNumber result = web3.ethBlockNumber().sendAsync().get();
        System.out.println(" The Block Number is: " + result.getBlockNumber().toString());
    }

    @Test
    public void testFuncCall(){
        Web3j web3j = Web3j.build(new HttpService("https://sepolia.infura.io/v3/ac3a17c914fd47a29cb5ed54315f746a"));
        String transactionHash = "";
        String myAddress = "0x288fB136C9291a4b62f1620bEE5901BEB2B0ffD7";
        String contractAddress = "0x51F3E7ba190E5e8BAf850E7324f500d3BCf27883";

        try {
            List inputParams = Arrays.asList(new TypeReference<Uint256>() {});
            inputParams.add(10);
            List outputParams = new ArrayList();
            Function function = new Function("store", inputParams, outputParams);

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

        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
        System.out.println(transactionHash);
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
    void test3() throws IOException {
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

}