package com.donjo.backend.util;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigInteger;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class ConvertUtilTest {

    @Test
    public void convertTest(){
        Double val = 10.111111;
        BigInteger val2 = ConvertUtil.doubleToBigInteger(val);
        System.out.println(val2);
        assertThat(val).isEqualTo(ConvertUtil.bigIntegerToDouble(val2));
        System.out.println(ConvertUtil.bigIntegerToDouble(val2));
    }
}