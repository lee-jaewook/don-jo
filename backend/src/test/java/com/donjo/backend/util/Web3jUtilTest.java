package com.donjo.backend.util;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.FunctionReturnDecoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.EthBlockNumber;
import org.web3j.protocol.core.methods.response.EthCall;
import org.web3j.protocol.core.methods.response.EthGetBalance;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.DefaultGasProvider;
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